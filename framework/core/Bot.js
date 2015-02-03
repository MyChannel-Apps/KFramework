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

var Bot = (new function() {
	var _user = KnuddelsServer.getDefaultBotUser();
	
	this.getAge = function() { 
		return _user.getAge();
	};
	
	this.getGender = function() { 
		return _user.getGender();
	};
	
	this.getKnuddelAmount = function() {
		return _user.getKnuddelAmount()
	};
	
	this.getNick = function() {
		return _user.getNick();
	};
	
	this.getOnlineMinutes = function() {
		return _user.getOnlineMinutes();
	};
	
	this.getProfileLink	= function(displayText) {
		return _user.getProfileLink(displayText == undefined ? this.getNick() : displayText);
	};
	
	this.getReadme = function() {
		return _user.getReadme();
	};
	
	this.getRegDate = function() {
		return _user.getRegDate();
	};
	
	this.getUserId = function() {
		return _user.getUserId();
	};
	
	this.getUserStatus = function() {
		return _user.getUserStatus();
	};
	
	this.getUserType = function() {
		return _user.getUserType();
	};
	
	this.isAppDeveloper = function() {
		return _user.isAppDeveloper();
	};
	
	this.isAppManager = function() {
		return _user.isAppManager();
	};

	this.isAway = function() {
		return _user.isAway();
	};

	this.isChannelModerator = function() {
		return _user.isChannelModerator();
	};

	this.isChannelOwner = function() {
		return _user.isChannelOwner();
	};
	
	this.isColorMuted = function() {
		return _user.isColorMuted();
	};

	this.isEventModerator = function() {
		return _user.isEventModerator();
	};
	
	this.isLocked = function() {
		return _user.isLocked();
	};
	
	this.isMuted = function() {
		return _user.isMuted();
	};	

	this.isOnline = function() {
		return _user.isOnline();
	};
	
	this.isOnlineInChannel = function() {
		return _user.isOnlineInChannel();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_join
	*/
	this.join = function() {
		_user.joinChannel();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_leave
	*/
	this.leave = function() {
		_user.leaveChannel();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_knuddel
	*/
	this.knuddel = function(user, amount, message) {
		if(message === undefined) {
			_user.transferKnuddel(user, amount);
		} else {
			_user.transferKnuddel(user, amount, message);
		}
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_getKnuddels
	*/
	this.getKnuddels = function() {
		return _user.getKnuddelAmount().asNumber();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_exception
	*/
	this.exception = function(exception) {
		_user.sendPublicMessage('°RR°_Exception:_°r°#' + (exception.message == undefined ? exception : exception.message));
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_publicMessage
	*/
	this.publicMessage = function(message) {
		if(Logger == undefined) {
			KnuddelsServer.getDefaultLogger().info('Bot.publicMessage(message) is DEPRECATED');
		} else {
			Logger.info('Bot.publicMessage(message) is DEPRECATED');
		}
		
		this.public(message);
	}
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_postMessage
	*/
	this.postMessage = function(user, message, topic) {
		if(Logger == undefined) {
			KnuddelsServer.getDefaultLogger().info('Bot.postMessage(user, message, topic) is DEPRECATED');
		} else {
			Logger.info('Bot.postMessage(user, message, topic) is DEPRECATED');
		}
		
		this.post(user, message, topic);
	}
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_privateMessage
	*/
	this.privateMessage = function(user, message) {
		if(Logger == undefined) {
			KnuddelsServer.getDefaultLogger().info('Bot.privateMessage(user, message) is DEPRECATED');
		} else {
			Logger.info('Bot.privateMessage(user, message) is DEPRECATED');
		}
		
		this.private(user, message);
	}
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_public
	*/
	this.public = function(message) {
		if(message instanceof KCode) {
			message = message.toString();
		}
		_user.sendPublicMessage(message);
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_post
	*/
	this.post = function(nick, message, topic) {
		if(message instanceof KCode) {
			message = message.toString();
		}
		
		// send to online users
		if(nick == undefined) {
			Channel.getUsers().each(function(user) {
				user.sendPostMessage(topic, message);
			});
		} else {
			nick.sendPostMessage(topic, message);
		}
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_private
	*/
	this.private = function(nick, message) {
		if(message instanceof KCode) {
			message = message.toString();
		}
		
		// send to online users
		if(nick == undefined) {
			if(Channel == undefined && !Object.prototype.each) {
				var users	= KnuddelsServer.getChannel().getOnlineUsers(UserType.Human);
				var size	= users.length;
				
				for(var index = 0; index < size; ++index) {
					users[index].sendPrivateMessage(message);
				}
			} else if(Channel != undefined && Object.prototype.each) {
				KnuddelsServer.getChannel().getOnlineUsers(UserType.Human).each(function(user) {
					user.sendPrivateMessage(message);
				});
			} else {
				Channel.getUsers().each(function(user) {
					user.sendPrivateMessage(message);
				});
			}
		} else {
			nick.sendPrivateMessage(message);
		}
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_exec
	*/
	this.exec = function(command) {
		_user.sendToChannel(command);
	};
	
	this.toString = function() {
		return '[KFramework Bot]';
	};
}());