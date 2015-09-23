/**
	The MIT License (MIT)

	Copyright (c) 2014 MyChannel-Apps.de

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
	
	@author		Adrian Preuß <Bizarrus>
	@docs		http://www.mychannel-apps.de/documentation/core/toplist
*/

var Top = (new function Top() {
	var _toplists	= [];
	var _instance	= this;
	var _events		= [];
	
	this.add = function add(toplist) {
		_toplists.push(toplist);
	};
	
	this.get = function get(name) {
		if(typeof(name) == 'undefined') {
			return _toplists;
		}
		
		var toplist = undefined;
		
		_toplists.each(function(top) {
			if(top.getName().toLowerCase() == name.toLowerCase()) {
				toplist = top;
				return false;
			}
		});
		
		return toplist;
	};
	
	this.addEvent = function addEvent(name, callback) {
		_events.push({
			name:		name,
			callback:	callback
		});
	};
	
	this.fireEvent = function fireEvent(name, user, data) {
		_events.each(function EventsEach(event) {
			if(event.name == name) {
				event.callback.call(this, user, data);
			}
		});
	};
	
	this.handleEvent = function handleEvent(user, data) {
		var params	= '';
		var event	= false;
		var block	= false;
		
		if(typeof(data.action) != 'undefined') {
			switch(data.action) {
				case 'init':
					block = true;
					this.fireEvent('onOpen', user, data);
				break;
				case 'close':
					block = true;
					user.sendEvent('close', block);
					this.fireEvent('onClose', user, data);				
				break;
			}
		} else if(typeof(data.name) != 'undefined') {
			params += data.name;
			
			if(typeof(data.page) != 'undefined') {
				params += ':';						
				params += data.page;
				event = true;						
			}
		}
		
		if(!block) {
			Logger.info(JSON.stringify(data));
			this.handleCommand(user, params, event);
		}
	};
	
	this.getCategorys = function getCategorys() {
		var categorys = {};
		
		_toplists.each(function(top) {
			var cat = top.getCategorys();
			
			if(typeof(categorys[cat[0]]) == 'undefined') {
				categorys[cat[0]] = [];
			}
			
			if(categorys[cat[0]].indexOf(cat[1]) == -1) {
				categorys[cat[0]].push(cat[1]);
			}				
		});
		
		return categorys;
	};
	
	this.handleCommand = function handleCommand(user, params, event) {
		event = (typeof(event) == 'undefined' ? false : event);
		
		if(params.length == 0) {
			var text		= new KCode();
			var _categorys	= _instance.getCategorys();
			
			text.append('Es gibt folgende Listen:');
			
			_categorys.each(function(categorys, name) {
				text.newLine();
				text.append('°r°');
				text.append('_');
				text.append(name);
				text.append(':_');
				text.newLine();
				
				categorys.each(function(category, index) {
					text.append(Colors.CHANNEL_BLUE);
					text.append('_');
					text.append(new KLink(category, '/toplist ' + name + ' ' + category));
					text.append('_°r°');
					
					if(index + 1 < categorys.size()) {
						text.append(', ');
					}
				});
			});
			
			user.private(text);
			return;
		}
		
		var page = 1;
		
		if(params.contains(':')) {
			var split	= params.split(':');
			var params	= split[0];
			page		= parseInt(split[1], 10);
		}
				
		var toplist = _instance.get(params);
		
		if(typeof(toplist) == 'undefined') {
			user.private('Die Topliste \"_' + params.escapeKCode() + '_\" existiert nicht.');
			return;
		}
		
		_instance.sendToplist(user, toplist, page, event);
	};
	
	this.sendToplist = function(user, toplist, page, event) {
		var users	= [];
		var limit	= 20;
		var entries	= toplist.getEntries(limit, page);
		var view	= new View('KFToplist');
		view.setSize(476, 522);
		//view.setMode(AppViewMode.Popup);

		entries.getData().each(function(entry, index) {
			var place = entry.getPosition();
			
			users.push({
				place: 		place,
				nickname:	entry.getUser().getNick(),
				bolded:		entry.getUser().getID() == user.getID(),
				points:		entry.getValue()
			});
		});
		
		if(event) {
			user.sendEvent('name',		toplist.getName());
			user.sendEvent('data',		users);
			user.sendEvent('limit',		limit);
			user.sendEvent('page',		entries.getPage());
			user.sendEvent('pages',		entries.getPages());
			return;
		}
		
		view.addObject('name',		toplist.getName());
		view.addObject('data',		users);
		view.addObject('limit',		limit);
		view.addObject('page',		entries.getPage());
		view.addObject('pages',		entries.getPages());
		
		if(!view.send(user)) {
			var text = new KCode();
			text.append('_Topliste - ' + toplist.getName() + '_');
			
			if(users.size() == 0) {
				text.newLine();
				text.append('"- Es existieren keine Einträge -"');
			} else {
				users.each(function(entry) {
					if(user.getClientType() == ClientType.Applet) {
						text.newLine();
					} else {
						text.append('°#r°');
					}
					
					text.append('_' + entry.place + '_');
					text.append('     ');
					
					if(entry.bolded) {
						text.append('°BB°_');
					}
					
					text.append('°>' + entry.nickname.escapeKCode() + '|/w "<°');
					
					if(entry.bolded) {
						text.append('_°r°');
					}
					
					text.append('     ');
					text.append(entry.points);
				});
			}
			
			var pages = entries.getPages();
			
			if(pages >= 2) {
				text.newLine();
				text.append('_Seiten:_ ');
				
				for(var index = 1; index <= pages; ++index) {
					if(entries.getPage() == index) {
						text.append('°BB°_');
					}
					
					text.append(new KLink('' + index, '/toplist ' + toplist.getName() + ':' + index));
					
					if(entries.getPage() == index) {
						text.append('_°r°');
					}
					
					text.append(' ');
				}
			}
			
			user.private(text);
		}
	};
	
	this.toString = function toString() {
		return '[KFramework Top]';
	};
});

function Toplist(key, categorys) {
	var _key		= '';
	var _categorys	= [];
	
	this.init = function init(key, categorys) {
		_key		= key;
		_categorys	= categorys;
		Top.add(this);
	};
	
	this.getKey = function getKey() {
		return _key;
	};
	
	this.getName = function getName() {
		var name = '';
		
		_categorys.each(function(category) {
			name += category + ' ';
		});
		
		return name.trim();
	};
	
	this.getCategorys = function getCategorys() {
		return _categorys;
	};
	
	this.getEntries = function getEntries(max, page) {
		return {
			getData:	function getData() {
				return UserPersistenceNumbers.getSortedEntries(_key, {
					ascending:	false,
					count:		max,
					page:		(page - 1)
				});
			},
			getPage: function getPage() {
				return page;
			},
			getPages: function getPages() {
				return UserPersistenceNumbers.getCount(_key) / max;
			}
		};
	};
	
	this.toJSON = function toJSON() {
		return {
			key:		_key,
			categorys:	_categorys
		};
	};
	
	this.toString = function toString() {
		return '[KFramework Toplist]';
	};
	
	this.init(key, categorys);
}