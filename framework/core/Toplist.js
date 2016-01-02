/**
	The MIT License (MIT)

	Copyright (c) 2014 UserApps.de

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
	@docs		http://www.userapps.de/documentation/core/toplist
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
				case 'view':
					if(typeof(data.name) != 'undefined') {
						params += data.name;
			
						if(typeof(data.page) != 'undefined') {
							params += ':';
							params += data.page;
							event = true;
						}
					}
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
		var prices	= toplist.getPrices();
		view.setSize(_size.width, _size.height);
		//view.setMode(AppViewMode.Popup);

		entries.getData().each(function(entry, index) {
			var place = entry.getPosition();
			
			users.push({
				place: 		place,
				nickname:	entry.getUser().getNick(),
				bolded:		entry.getUser().getID() == user.getID(),
				points:		entry.getValue(),
				price:		(typeof(prices[place - 1]) != 'undefined' ? prices[place - 1] : {})
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
					
					if(typeof(prices[entry.place - 1]) != 'undefined') {
						var price = prices[entry.place - 1];
						
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
					
					text.append('     ');
					text.append(entry.points.toFixed(2));
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
	var _instance		= this;
	var _categorys		= [];
	var _prices			= [];
	var _payout_cycle	= undefined;
	var _payout_cron	= undefined;
	var _payout_remove	= false;
	
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
	
	this.setPayout = function setPayout(cycle, remove) {
		_payout_cycle	= cycle;
		_payout_remove	= remove;
		this.createCron();
	};
	
	this.getPayout = function getPayout() {
		return _payout_cycle;
	};
	
	this.createCron = function createCron() {
		if(typeof(_payout_cron) == 'undefined' && typeof(_payout_cycle) != 'undefined') {
			_payout_cron = new Cronjob('::Toplist:' + _key, _payout_cycle, this.executeCron);
			return;
		}
		
		if(typeof(_payout_cycle) != 'undefined') {
			_payout_cron.changeCycle(_payout_cycle);
		}
	};
	
	
	this.executeCron = function executeCron() {
		var entries = [];
		
		UserPersistenceNumbers.each(_key, function(user) {
			entries.push({
				user:	user,
				place:	UserPersistenceNumbers.getPosition(_key, user, {
					ascending: false
				})
			});
		}, {
			onEnd: function() {
				var index	= 0;
				var watcher = setInterval(function() {
					for(var i = 0; i < 100; ++i) {
						var entry	= entries.shift();
						
						if(typeof(entry) == 'undefined') {
							clearInterval(watcher);
							return;
						}
						
						var user	= entry.user;
						var place	= entry.place;
						
						if(typeof(user) == 'undefined') {
							clearInterval(watcher);
							return;
						}
						
						var value	= DB.load(_key, 0, user);
						var text	= new KCode();
						
						text.append('Hallo _' + user.getProfileLink() + '_,');
						text.newLine();
						text.newLine();
						
						var price = _prices[place - 1];
						
						text.append('für die Topliste _\"');
						text.append(_instance.getName());
						text.append('\"_ im _°BB>Channel ');
						text.append(Channel.getName());
						text.append('|/go ');
						text.append(Channel.getName());
						text.append('<r°_ hast du _');
						text.append(value.toFixed(2));
						text.append(' Punkte_ erreicht');
						text.newLine();
						text.append('und machst somit den _');
						text.append(place);
						text.append('. Platz_.');
						
						if(typeof(price) != 'undefined') {
							text.newLine();
							text.newLine();
							text.append('Für deine Platzierung erhälst du folgenden Gewinn:');
							text.newLine();
							
							switch(price.type) {
								case 'knuddel':
									text.append(' - _');
									text.append(new KImage('sm_classic_00.gif'));
									text.append(' ');
									text.append(price.value);
									text.append(' Knuddel_');
									Logger.info('Toplist: ' + user.getNick() + ', Place: ' + place + ', Kn: ' + price.value);
									Bot.knuddel(user, price.value, 'Toplisten-Gewinn: ' + _instance.getName(), false);
								break;
								case 'code':
									text.append(' - _');
									text.append(price.value);
									text.append(' ');
									text.append(new KImage('features/codegenerator/code_001.png'));
									text.append(' SmileyCode_');
								break;
							}
						}

						if(typeof(price) != 'undefined') {
							user.post('°BB°' + KnuddelsServer.getAppName() + '°r°: Topliste - ' + _instance.getName(), text.toString());
						}
						
						if(_payout_remove) {
							DB.delete(_key, user);
						}
						
						++index;
					}
				}, 5000);
			}
		});
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