var App;
var Bot;
var Users;
var DB;
var Version		= '1.0.1';
var Exceptions	= [];
var Queue		= [];

require('framework/UI.js');
require('framework/KCode.js');

try {
	var Container	= {
		_layout:	UI.Poker
	};

	function registerFramework(instance, func, methods) {
		for(var methods in instance) {
			func[methods] = instance[methods];
		}
		
		func.getUI = function() {
			return Container._layout;
		};
		
		func.registerCommand = function(command, callback) {
			callback = registerFramework(func, callback);
			
			if(App.chatCommands == undefined) {
				Queue.push({
					action:		'registerCommand',
					command:	command,
					callback:	callback
				});
				
				return;
			}
			
			App.chatCommands[command] = callback;
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
		Users = (new function() {
			this.get = function(nickname) {
				if(KnuddelsServer.userExists(nickname)) {
					var userId	= KnuddelsServer.getUserId(nickname);
					
					if(KnuddelsServer.canAccessUser(userId)) {
						nickname	= KnuddelsServer.getUser(userId);
					}
				}
				
				if(typeof(nickname) == 'string') {
					return (new function User() {
						var _nickname			= nickname;
						this.virtual			= true;
						this.getPersistence		= function() {
							return (new function Persistence() {
								var _data = {};
								
								this.deleteNumber = function(key) { delete _data[key]; };
								this.deleteObject = function(key) { delete _data[key]; };
								this.deleteString = function(key) { delete _data[key]; };
								this.getString = function(key, defaults) { return _data[key] || defaults; };
								this.getNumber = function(key, defaults) { return _data[key] || defaults; };
								this.getObject = function(key, defaults) { return _data[key] || defaults; };
							}());
						};
						this.getNick			= function() { return _nickname; };
						this.getUserId			= function() { return -1; };
						this.getKnuddelAmount	= function() { return new KnuddelAmount(-1); };
						this.sendPrivateMessage	= function(message) {};
					}());
				}
				
				return nickname;
			};
		}());
		
		DB	= (new function() {
			this.getUser = function(user) {
				return user.getPersistence();
			};
			
			this.getChannel = function() {
				return KnuddelsServer.getPersistence();
			};
		}());
		
		Bot = (new function() {
			var _user = KnuddelsServer.getDefaultBotUser();
			
			this.join = function() {
				_user.joinChannel();
			};
			
			this.leave = function() {
				_user.leaveChannel();
			};
			
			this.exception = function(exception) {
				_user.sendPublicMessage('°RR°_Exception:_°r°#' + (exception.message == undefined ? exception : exception.message));
			};
			
			this.publicMessage = function(message) {
				if(message instanceof KCode) {
					message = message.toString();
				}
				
				_user.sendPublicMessage(message);
			};
			
			this.postMessage = function(user, message, topic) {
				if(message instanceof KCode) {
					message = message.toString();
				}
				
				// send to online users
				if(user == undefined) {
					var users = KnuddelsServer.getChannel().getOnlineUsers(UserType.Human);
					for(var index in users) {
						var user = users[index];
						user.sendPostMessage(topic, message);
					}
				} else {
					user.sendPostMessage(topic, message);
				}
			};
			
			this.privateMessage = function(user, message) {
				if(message instanceof KCode) {
					message = message.toString();
				}
				
				// send to online users
				if(user == undefined) {
					var users = KnuddelsServer.getChannel().getOnlineUsers(UserType.Human);
					for(var index in users) {
						var user = users[index];
						_user.sendPrivateMessage(message, user);
					}
				} else {
					_user.sendPrivateMessage(message, user);
				}
			};
			
			this.exec = function(command) {
				_user.sendToChannel(command);
			};
		}());
		
		App = (new function() {
			if(instance.init != undefined) {
				this.onAppStart		= registerFramework(instance, instance.init, ['setUI']);
				this.onAppStart.run	= function() {
					var entry = Queue.shift();
					if(entry != undefined) {
						switch(entry.action) {
							case 'registerCommand':
								if(App.chatCommands == undefined) {
									App.chatCommands = {};
								}
								
								App.chatCommands[entry.command] = entry.callback;
								KnuddelsServer.refreshHooks();
							break;
						}
					}
					
					if(instance.run != undefined) {
						instance.run();
					}
				};
				
				setInterval(this.onAppStart.run, 100);
			}
			
			if(instance.userJoin != undefined) {
				this.onUserJoined	= registerFramework(instance, instance.userJoin);
			}
			
			if(instance.userLeave != undefined) {
				this.onUserLeft		= registerFramework(instance, instance.userLeave);
			}
		}());
	}
} catch(e) {
	Exceptions.push(e);
}