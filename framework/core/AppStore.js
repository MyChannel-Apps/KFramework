/**
	The MIT License (MIT)

	Copyright (c) 2015 MyChannel-Apps.de

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
	@docs		http://www.mychannel-apps.de/documentation/core/store
*/

var Payment = {
	/*
		@docs		http://www.mychannel-apps.de/documentation/Payment_TIER_0
	*/
	TIER_0:		0x01,
	
	/*
		@docs		http://www.mychannel-apps.de/documentation/Payment_TIER_1
	*/
	TIER_1:		0x02,
	
	/*
		@docs		http://www.mychannel-apps.de/documentation/Payment_TIER_2
	*/
	TIER_2:		0x03,
	
	/*
		@docs		http://www.mychannel-apps.de/documentation/Payment_TIER_3
	*/
	TIER_3:		0x04,
	
	/*
		@docs		http://www.mychannel-apps.de/documentation/Payment_TIER_4
	*/
	TIER_4:		0x05,
	
	/*
		@docs		http://www.mychannel-apps.de/documentation/Payment_TIER_5
	*/
	TIER_5:		0x06,
	
	/*
		@docs		http://www.mychannel-apps.de/documentation/Payment_TIER_6
	*/
	TIER_6:		0x07,
	
	/*
		@docs		http://www.mychannel-apps.de/documentation/Payment_TIER_7
	*/
	TIER_7:		0x08
};

var PaymentInterval = {
	/*
		@docs		http://www.mychannel-apps.de/documentation/PaymentInterval_Daily
	*/
	Daily:		0x01,
	
	/*
		@docs		http://www.mychannel-apps.de/documentation/PaymentInterval_Weekly
	*/
	Weekly:		0x02,
	
	/*
		@docs		http://www.mychannel-apps.de/documentation/PaymentInterval_Monthly
	*/
	Monthly:	0x03
};

var AppStore = (new function() {
	var _container	= undefined;
	var _app		= undefined;
	var _developer	= KnuddelsServer.getAppDeveloper();
	var _owner		= Channel.getOwner();
	var _store_data = DB.load('_appstore', {
		time_payed:				undefined,
		time_first_installed:	undefined,
		is_payed:				'F',
		is_locked:				'F',
		locked_reason:			''
	});
	
	var _options = {
		allowed_commands: 		[],
		tier:					Payment.TIER_0,
		payment: {
			knuddel: 	0
			interval:	PaymentInterval.Weekly,
			profit:		0
		}
	};
	
	/*
		@docs		http://www.mychannel-apps.de/documentation/AppStore_setSettings
	*/
	this.setSettings = function(options) {
		_options = options.compare(_options);
	};
	
	/*
		@docs		http://www.mychannel-apps.de/documentation/AppStore_app
	*/
	this.app = function(container) {
		_container	= new container();
		_app		= new container();

		if(_app.onAppStart != undefined && !AppStore.hasPayed()) {
			_app.onAppStart = function() {
				try {
					var test = new Date(_store_data.time_first_installed);
				} catch(e) {
					_store_data.time_first_installed = undefined;
				}
			
				if(_store_data.time_first_installed == undefined) {
					_store_data.time_first_installed = new Date().getTime();
				}
				
				if(AppStore.isLocked()) {
					AppStore.appIsLocked();
					return;
				}
				
				if(!AppStore.hasPayed()) {
					AppStore.askForPayment();
					return;
				}
				
				_container.onAppStart();
			};
		}
		
		if(_app.onPrepareShutdown != undefined && !AppStore.hasPayed()) {
			_app.onPrepareShutdown = function(secondsTillShutdown,shutdownType) {
				if(!AppStore.hasPayed()) {
					return;
				}
				
				_container.onPrepareShutdown(secondsTillShutdown, shutdownType);
			};
		}
		
		if(_app.onShutdown != undefined && !AppStore.hasPayed()) {
			_app.onShutdown = function() {
				DB.save('_appstore', _store_data);
				
				if(!AppStore.hasPayed()) {
					return;
				}
				
				_container.onShutdown();
			};
		}

		if(_app.onUserJoined != undefined && !AppStore.hasPayed()) {
			_app.onUserJoined = function(user) {
				if(!AppStore.hasPayed()) {
					return;
				}
				
				_container.onUserJoined(user);
			};
		}
		
		if(_app.onUserLeft != undefined && !AppStore.hasPayed()) {
			_app.onUserLeft = function(user) {
				if(!AppStore.hasPayed()) {
					return;
				}
				
				_container.onUserLeft(user);
			};
		}
		
		if(_app.mayJoinChannel != undefined && !AppStore.hasPayed()) {
			_app.mayJoinChannel = function(user) {
				if(!AppStore.hasPayed()) {
					return ChannelJoinPermission.accepted();
				}
				
				return _container.mayJoinChannel(user);
			};
		}
		
		if(_app.maySendPublicMessage != undefined && !AppStore.hasPayed()) {
			_app.maySendPublicMessage = function(publicMessage) {
				if(!AppStore.hasPayed()) {
					return true;
				}
				
				return _container.maySendPublicMessage(publicMessage);
			};
		}
		
		if(_app.onPrivateMessage != undefined && !AppStore.hasPayed()) {
			_app.onPrivateMessage = function(privateMessage) {
				if(!AppStore.hasPayed()) {
					return;
				}
				
				_container.onPrivateMessage(privateMessage);
			};
		}
		
		if(_app.onPublicMessage != undefined && !AppStore.hasPayed()) {
			_app.onPublicMessage = function(publicMessage) {
				if(!AppStore.hasPayed()) {
					return;
				}
				
				_container.onPublicMessage(publicMessage);
			};
		}
		
		if(_app.onKnuddelReceived != undefined && !AppStore.hasPayed()) {
			_app.onKnuddelReceived = function(sender, receiver, knuddelAmount) {
				if(AppStore.hasPayed()) {
					_container.onKnuddelReceived(sender, receiver, knuddelAmount);
					return;
				}
				
				Bot.public("Check Bot Knuddel...");
			};
		}
		
		if(_app.onUserDiced != undefined && !AppStore.hasPayed()) {
			_app.onUserDiced = function(diceEvent) {
				if(!AppStore.hasPayed()) {
					return;
				}
				
				_container.onUserDiced(diceEvent);
			};
		}
		
		if(_app.chatCommands == undefined) {
			_app.chatCommands = {};
		}
		
		for(var name in _app.chatCommands) {
			_app.chatCommands[name] = function(user, params, command) {
				if(AppStore.isLocked()) {
					Bot.private(user, 'Die App ist derzeit °R°_GESPERRT°r°_!');
					return;
				}
				
				if(!AppStore.hasPayed()) {
					Bot.private(user, 'Die App ist derzeit °R°_DEAKTIVIERT°r°_!');
					return;
				}
				
				_container.chatCommands[command](user, params, command);
			};
		}
		
		_app.chatCommands['Store:' + KnuddelsServer.getAppName()] = AppStore.handleCommand;
		
		return _app;
	};
	
	this.handleCommand = function(user, params, command) {
		if(!user.isAppDeveloper()) {
			Bot.private(user, 'Diese Funktion steht dir nicht zur verfügung.');
			return;
		}
		
		var command = params;
		var message	= '';
		
		if(params.indexOf(':') > -1) {
			var split	= params.split(':');
			command		= split[0];
			
			for(var index in split) {
				if(index > 0) {
					message += split[index];
				}
			}
		}
		
		switch(command) {
			case '!lock':
				if(_store_data.is_locked == 'F') {
					Bot.private(user, 'Die App kann nicht _entsperrt_ werden.');
					return;
				}
				
				_store_data.is_locked		= 'F';
				_store_data.locked_reason	= '';
				DB.save('_appstore', _store_data);
				Bot.private(user, 'Die App wurde _entsperrt_!');
			break;
			case 'lock':
				if(message.length == 0) {
					Bot.private(user, 'Du musst eine Sperrgebründung angeben!');
					return;
				}
				
				_store_data.is_locked		= 'T';
				_store_data.locked_reason	= message;
				DB.save('_appstore', _store_data);
				Bot.private(user, 'Die App wurde _°R°GESPERRT°r°_!');
			break;
			default:
			
			break;
		}
	};
	
	/*
		@docs		http://www.mychannel-apps.de/documentation/AppStore_isLocked
	*/
	this.isLocked = function() {
		if(_options.tier == Payment.TIER_0 && _developer.getUserId() != _owner.getUserId()) {
			return true;
		}
		
		if(_store_data.is_locked == 'T') {
			return true;
		}
		
		return false;
	};
	
	/*
		@docs		http://www.mychannel-apps.de/documentation/AppStore_hasPayed
	*/
	this.hasPayed = function() {
		if(_options.tier == Payment.TIER_0 && _developer.getUserId() == _owner.getUserId()) {
			return true;
		}
		
		return _store_data.is_payed == 'T';
	};
	
	this.askForPayment = function() {
		var text			= new KCode();
		var knuddel_button	= new KButton(_options.knuddel + ' Knuddel bezahlen*', '/knuddel ' + Bot.getNick() + ':' + _options.knuddel);
		
		knuddel_button.setIcon('sm_classic_yellow.gif');
		
		text.append('Hallo _');
		text.append(_owner.getProfileLink());
		text.append('_!');
		text.newLine();
		text.append('Du möchtest die App _');
		text.append(KnuddelsServer.getAppName());
		text.append('_ von ');
		text.append(_developer.getProfileLink());
		text.append(' installieren.');
		text.newLine();
		text.append('Der App-Entwickler möchte für die Nutzung dieser App ');
		text.append(new KImage('sm_classic_yellow.gif'));
		text.append('_ ');
		text.append(_options.knuddel);
		text.append(' Knuddel_ haben:');
		text.newLine();
		text.newLine();
		text.append(knuddel_button);
		text.newLine();
		text.append('°12°');
		text.append('"');
		text.append('* Die anfallende Gebühr wird auf deinem AppBot gesendet und wird dann an den App-Entwickler weitergereicht.');
		text.newLine();
		text.append('  Nach erfolgreicher Transaktion wird die App freigeschaltet und du kannst diese dann im vollen Umfang nutzen!');
		text.append('°r°');
		
		Bot.private(_owner, text);
	};
	
	this.appIsLocked = function() {
		var text			= new KCode();
		text.append('Diese App ist °R°_GESPERRT_°r°!');
		
		if(_developer.getUserId() != _owner.getUserId()) {
			text.newLine();
			text.append('Du darfst diese App nicht installieren da diese ausschließlich für den App-Entwickler _');
			text.append(_developer.getProfileLink());
			text.append('_ vorbehalten ist.');
		} else if(_store_data.locked_reason.length > 0) {
			text.newLine();
			text.append('Grund:');
			text.newLine();
			text.addDots();
			text.append(_store_data.locked_reason);
			text.newLine();
			text.append('Bitte wende dich an den App-Entwickler _');
			text.append(_developer.getProfileLink());
			text.append('_ um das Problem zu lösen.');
		} else {
			text.newLine();
			text.append('Bitte wende dich an den App-Entwickler _');
			text.append(_developer.getProfileLink());
			text.append('_ um das Problem zu lösen.');
		}
		
		Bot.private(_owner, text);
	};
	
	/*
		@docs		http://www.mychannel-apps.de/documentation/AppStore_toString
	*/
	this.toString = function() {
		return '[KFramework AppStore]';
	};
});