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
	var _size		= {
		width:	476,
		height:	522
	};
	
	this.setSize = function setSize(width, height) {
		_size.width		= width;
		_size.height	= height;
	};
	
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
		view.setSize(_size.width, _size.height);
		//view.setMode(AppViewMode.Popup);

		entries.getData().each(function(entry, index) {
			var place = entry.getPosition();
			
			users.push({
				place: 		place,
				nickname:	entry.getUser().getNick(),
				bolded:		entry.getUser().getID() == user.getID(),
				points:		entry.getValue(),
				price:		(typeof(_prices[place]) != 'undefined' ? _prices[place] : {})
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
					
					if(typeof(_prices[place]) != 'undefined') {
						var price = _prices[place];
						
						text.append(' (');
						switch(price.type) {
							case 'knuddel':
								text.append('°>sm_classic_00.gif<° ' + price.value + ' Knuddel');
							break;
							case 'code':
								text.append(price.value + ' °>features/codegenerator/code_001...mw_30.mh_15.png<°');
							break;
						}
						text.append(')');
					}
					
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
	var _key			= '';
	var _categorys		= [];
	var _prices			= [];
	var _payout_cycle	= undefined;
	var _payout_cron	= undefined;
	
	this.init = function init(key, categorys) {
		_key		= key;
		_categorys	= categorys;
		Top.add(this);
		this.createCron();
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
	
	this.setPayout = function setPayout(cycle) {
		_payout_cycle = cycle;
		this.createCron();
	};
	
	this.getPayout = function getPayout() {
		return _payout_cycle;
	};
	
	this.createCron = function createCron() {
		if(typeof(_payout_cron) == 'undefined') {
			_payout_cron = new Cronjob('::Toplist:' + _key, _payout_cycle, this.executeCron);
			return;
		}
		
		_payout_cron.changeCycle(_payout_cycle);
	};
	
	this.executeCron = function executeCron() {		
		var users = [];
		
		UserPersistenceNumbers.each(_key, function(user) {
			users.push(user);
		}, {
			onEnd:			function() {
				var index = 0;
				
				var watcher = setInterval(function() {
					for(var i = 0; i < 100; ++i) {
						var user	= users.shift();
						var won		= 0;
						var value	= DB.load(_key, 0, user);
						var text	= new KCode();
						
						if(users.size() == 0 || typeof(user) == 'undefined') {
							clearInterval(watcher);
						}
						
						text.append('Hallo _' + user.getProfileLink() + '_,');
						text.newLine();
						/*
						if(typeof(_prices[index]) == 'undefined') {
							user.post('°BB°' + KnuddelsServer.getAppName() + ' Topliste°r°: ' + _instance.getName(),
							
							'Hallo _$NICKNAME,
							
							_°##°Du hast letze Woche _Platz $PLACE _bei MyCloud mit _$POINTS Litern_ gemacht.'.formater({
								NICKNAME:	user.getNick(),
								PLACE:		index + 1,
								POINTS:		value
							}));
						} else {
							if(index == 0) {
								user.post('°BB°' + KnuddelsServer.getAppName() + ' Topliste°r°: ' + _instance.getName(), 'Hallo _$NICKNAME, _°##°Du hast letze Woche _Platz $PLACE _bei MyCloud mit _$POINTS Litern_ gemacht und erhälst dafür _°>sm_classic_00.gif<r° $KNUDDEL Knuddel_ und einen _SmileyCode_ als Gewinn.°#°Der SmileyCode wird in den nächsten Stunden an deinen Nicknamen übermittelt.°##°Glückwunsch!'.formater({
									NICKNAME:	user.getNick(),
									PLACE:		index + 1,
									POINTS:		Format(value),
									KNUDDEL:	Format(_prices[index], 0)
								}));
							} else {
								user.post('°BB°' + KnuddelsServer.getAppName() + ' Topliste°r°: ' + _instance.getName(), 'Hallo _$NICKNAME, _°##°Du hast letze Woche _Platz $PLACE _bei MyCloud mit _$POINTS Litern_ gemacht und erhälst dafür _°>sm_classic_00.gif<r° $KNUDDEL Knuddel_ als Gewinn.°##°Glückwunsch!'.formater({
									NICKNAME:	user.getNick(),
									PLACE:		index + 1,
									POINTS:		Format(value),
									KNUDDEL:	Format(_prices[index], 0)
								}));
							}

							KBank.addKn(user.getID(), _prices[index]);
						}*/
						
						// @ToDo enable/disable deletion
						DB.delete(_key, user);
						++index;
					}
				}, 5000);
			}
	};
	
	this.getPrices = function getPrices() {
		return _prices;
	};
	
	this.addPrice = function addPrice(type, value) {
		_prices.push({
			type:	type,
			value:	value
		});
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
			categorys:	_categorys,
			prices:		_prices
		};
	};
	
	this.toString = function toString() {
		return '[KFramework Toplist]';
	};
	
	this.init(key, categorys);
}