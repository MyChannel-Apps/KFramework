var App;
var Bot;
var Version		= '1.0.0';
var Exceptions	= [];

require('framework/UI.js');
require('framework/KCode.js');

try {
	var Container	= {
		_layout:	UI.Poker
	};

	function registerFramework(func, methods) {
		func.getUI = function() {
			return Container._layout;
		};
		
		func.registerCommand = function(command, callback) {
			App.chatCommands[command] = function(user, params, command) {
				callback(params, user);
			};
			
			KnuddelsServer.refreshHooks();
		};
		
		if(methods != undefined) {
			if(methods.indexOf('setUI') > -1) {
				func.setUI = function(layout) {
					Container._layout = layout;
				};
			}
		}
		
		return func;
	}
	
	function bootstrap(instance) {
		Bot = (new function() {
			var _user = KnuddelsServer.getDefaultBotUser();
			
			this.join = function() {
				_user.joinChannel();
			};
			
			this.leave = function() {
				_user.leaveChannel();
			};
			
			this.publicMessage = function(message) {
				if(message instanceof KCode) {
					message = message.toString();
				}
				
				_user.sendPublicMessage(message);
			};
			
			this.privateMessage = function(user, message) {
				if(message instanceof KCode) {
					message = message.toString();
				}
				
				_user.sendPrivateMessage(message, user);
			};
			
			this.postMessage = function(user, subject, message) {
				if(message instanceof KCode) {
					message = message.toString();
				}
				
				_user.sendPostMessage(user, subject, message);
			};
			
			this.exec = function(command) {
				_user.sendToChannel(command);
			};
		}());
		
		
		App = (new function() {
			if(instance.init != undefined) {
				this.onAppStart		= registerFramework(instance.init, ['setUI']);
			}
			
			if(instance.userJoin != undefined) {
				this.onUserJoined	= registerFramework(instance.userJoin);
			}
			
			if(instance.userLeave != undefined) {
				this.onUserLeft		= registerFramework(instance.userLeave);
			}
			
			this.chatCommands	= {
				framework: function(user, params, command) {
					if(params == 'exceptions') {
						if(Exceptions.length == 0) {
							Bot.privateMessage(user, 'Currently no _Exceptions_ tracked.');
							return;
						}
						
						var exceptions = '';
						for(var index in Exceptions) {
							var Exception	= Exceptions[index];
							exceptions		+= '#°%10°[' + Exception.name + '] ' + Exception.message;
						}
						
						Bot.privateMessage(user, '_Exception:_#' + exceptions);
						return;
					}
					
					var commands = [
						'°%10>/framework exceptions|/framework exceptions<°'
					];
					
					var usercommands = [];
					KnuddelsServer.refreshHooks();
					// @ToDo UserCommands won't work correctly...
					for(var command in this.chatCommands) {
						if(command == 'framework') {
							continue;
						}
						
						usercommands.push('°%10>/' + command + '|' + command + '<°');
					}
					
					Bot.privateMessage(user, '°BB°_MyChannel-Apps.de_°r° Framework v' + Version + '#Following commands are available:#' + commands.join('#') + '#°r%00°User Commands:#' + usercommands.join('#'));
				}
			};
		}());
	}
} catch(e) {
	Exceptions.push(e);
}