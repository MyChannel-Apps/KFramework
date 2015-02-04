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
	
	@author		Adrian Preuß <Bizarrus>, Christoph Kühl <djchrisnet>
	@docs		http://www.mychannel-apps.de/documentation/core/bot
*/

var AppStore = (new function() {
	var _developer	= KnuddelsServer.getAppDeveloper();
	var _store_data = DB.load('_appstore', {
		knuddel:				0,
		time_payed:				undefined,
		time_first_installed:	undefined,
		is_payed:				0
	});
	
	var _options = {
		allowed_commands: 	[],
		knuddel:			0
	};
	
	this.setSettings = function(options) {
		_options = options.compare(_options);
	};
	
	this.onAppStart = function(onAppStart) {
		try {
			var test = new Date(_store_data.time_first_installed);
		} catch(e) {
			_store_data.time_first_installed = undefined;
		}
		
		if(_store_data.time_first_installed == undefined) {
			_store_data.time_first_installed = new Date().getTime();
		}
		
		if(!this.hasPayed()) {
			return function() {
				AppStore.askForPayment(Channel.getOwner());				
			};
		}
		
		return onAppStart;
	};
	
	this.onKnuddelReceived = function(onKnuddelReceived) {
		if(!this.hasPayed()) {
			return function(sender, receiver, amount) {
				_store_data.knuddel += amount.asNumber();
				
				if(_store_data.knuddel >= _options.knuddel && Bot.getKnuddels() >= _options.knuddel) {
					Bot.private(sender, 'Die App wurde erfolgreich bezahlt und kann nun genutzt werden!');
					
					_store_data.time_payed	= new Date().getTime();
					_store_data.knuddel		= _options.knuddel;
					_store_data.is_payed	= 1;
					
					/* Knuddel App Developer */
					Bot.knuddel(_developer, new KnuddelAmount(_options.knuddel), 'App Installation');
					
					/* Start The App */
					AppStore.onAppStart();
					
					/* Information to Developer */
					var text = new KCode();
					text.append('Hallo _');
					text.append(_developer.getNick());
					text.append('_,');
					text.newLine();
					text.newLine();
					text.append('jemand hat eine deiner Apps über der °BB°_AppStore_°r° installiert.');
					text.newLine();
					text.newLine();
					text.append('_Channel:_ ');
					text.append(Channel.getName());
					text.newLine();
					text.append('_Channel Besitzer:_ ');
					text.append(Channel.getOwner().getProfileLink());
					text.newLine();
					text.append('_AppBot:_ ');
					text.append(Bot.getProfileLink());
					text.newHr();
					text.append('_Zahlung von:_ ');
					text.append(sender.getProfileLink());
					text.newLine();
					text.append('_App Erstinstallation:_ ');
					text.append(new Date(_store_data.time_first_installed));
					text.newLine();
					text.append('_Bezahlt am:_ ');
					text.append(new Date(_store_data.time_payed));
					text.newHr();
					text.append('_App Kosten:_ ');
					text.append(_options.knuddel);
					_developer.sendPostMessage('App installiert', text);
				} else {
					var knuddel_needed	= (_options.knuddel - _store_data.knuddel);
					var text			= new KCode();
					var knuddel_button	= new KButton(knuddel_needed + ' Knuddel bezahlen*', '/knuddel ' + Bot.getNick() + ':' + knuddel_needed);
					text.append('Du musst noch ');
					text.append(new KImage('sm_classic_yellow.gif'));
					text.append('_ ');
					text.append(knuddel_needed);
					text.append(' Knuddel_ einzahlen damit die App gestartet werden kann:');
					text.newLine();
					text.append(knuddel_button);
					Bot.private(sender, text);
				}
			};
		}
		
		return onKnuddelReceived;
	};
	
	this.onShutdown = function(onShutdown) {
		DB.save('_appstore', _store_data);
			
		if(!this.hasPayed()) {
			return function() {
				/* Do Nothing */
			}
		}
		
		return onShutdown;
	};
	
	this.chatCommands = function(chatCommands) {
		if(this.hasPayed()) {
			return chatCommands;
		}
		
		var original	= chatCommands;
		var copy		= chatCommands;
		
		copy.each(function(callback, index) {
			if(_options.allowed_commands.indexOf(index) == -1) {
				copy[index] = function(user, params, command) {
					if(!instance.hasPayed()) {
						Bot.private(user, 'Die App ist derzeit °R°_DEAKTIVIERT°r°_!');
					} else {
						original[command].apply(App, [user, params, command]);
					}
				};
			}
		});
		
		//copy['appstore'] = function(user, params, command) {};
		
		return copy;
	};
	
	this.hasPayed = function() {
		if(_options.knuddel <= 0) { //|| _developer.getNick() === Channel.getOwner().getNick()) {
			return true;
		}
		
		return _store_data.is_payed == 1;
	};
	
	this.askForPayment = function(user) {
		var text			= new KCode();
		var knuddel_button	= new KButton(_options.knuddel + ' Knuddel bezahlen*', '/knuddel ' + Bot.getNick() + ':' + _options.knuddel);
		
		knuddel_button.setIcon('sm_classic_yellow.gif');
		
		text.append('Hallo _');
		text.append(user.getProfileLink());
		text.append('_!');
		text.newLine();
		text.append('Du möchtest die App _$APPNAME_ von ');
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
		text.append('  Nach erfolgreicher Transaktion wird die App freigeschaltet und du kannst diese dann im vollen Umfang nutzen!');
		text.append('°r°');
		
		Bot.private(user, text);
	};
	
	this.toString = function() {
		return '[KFramework AppStore]';
	};
}());