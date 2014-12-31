var Bot = (new function() {
	var _user = KnuddelsServer.getDefaultBotUser();
	
	this.getNick = function() {
		return _user.getNick();
	};
	
	this.join = function() {
		_user.joinChannel();
	};
	
	this.leave = function() {
		_user.leaveChannel();
	};
	
	this.knuddel = function(user, amount, message) {
		if(message === undefined) {
			_user.transferKnuddel(user, amount);
		} else {
			_user.transferKnuddel(user, amount, message);
		}
	};
	
	this.getKnuddels = function() {
		return _user.getKnuddelAmount().asNumber();
	};
	
	this.exception = function(exception) {
		_user.sendPublicMessage('°RR°_Exception:_°r°#' + (exception.message == undefined ? exception : exception.message));
	};
	
	this.publicMessage = function(message) {
		Logger.info("Bot.publicMessage(message) is DEPRECATED");
		this.public(message);
	}
	
	this.postMessage = function(user, message, topic) {
		Logger.info("Bot.postMessage(user, message, topic) is DEPRECATED");
		this.post(user, message, topic);
	}
	
	this.privateMessage = function(user, message) {
		Logger.info("Bot.privateMessage(user, message) is DEPRECATED");
		this.private(user, message);
	}
	
	this.public = function(message) {
		if(message instanceof KCode) {
			message = message.toString();
		}
		_user.sendPublicMessage(message);
	};
	
	this.post = function(user, message, topic) {
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
	
	this.private = function(user, message) {
		if(message instanceof KCode) {
			message = message.toString();
		}
		
		// send to online users
		if(user == undefined) {
			var users = KnuddelsServer.getChannel().getOnlineUsers(UserType.Human);
			for(var index in users) {
				var user = users[index];
				user.sendPrivateMessage(message);
				//_user.sendPrivateMessage(message, user);
			}
		} else {
			var users = KnuddelsServer.getChannel().getOnlineUsers(UserType.Human);
			for(var index in users) {
				if(users[index].getNick() == user.toString()) {
					users[index].sendPrivateMessage(message);
				}
				//_user.sendPrivateMessage(message, user);
			}
			//_user.sendPrivateMessage(message, user);
		}
	};
	
	this.exec = function(command) {
		_user.sendToChannel(command);
	};
}());