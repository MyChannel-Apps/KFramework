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
*/

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