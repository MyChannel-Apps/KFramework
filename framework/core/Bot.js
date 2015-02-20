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
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_getAge
	*/
	this.getAge = function() { 
		return _user.getAge();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_getGender
	*/
	this.getGender = function() { 
		return _user.getGender();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_getKnuddelAmount
	*/
	this.getKnuddelAmount = function() {
		return _user.getKnuddelAmount();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_getNick
	*/
	this.getNick = function() {
		return _user.getNick();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_getOnlineMinutes
	*/
	this.getOnlineMinutes = function() {
		return _user.getOnlineMinutes();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_getProfileLink
	*/
	this.getProfileLink	= function(displayText) {
		return _user.getProfileLink(displayText == undefined ? this.getNick() : displayText);
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_getProfilePicture
	*/
	this.getProfilePicture	= function() {
		return 'http://chat.knuddels.de/pics/fotos/knuddels.de?n=' + _user.getNick().urlencode();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_getReadme
	*/
	this.getReadme = function() {
		return _user.getReadme();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_getRegDate
	*/
	this.getRegDate = function() {
		return _user.getRegDate();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_getUserId
	*/
	this.getUserId = function() {
		return _user.getUserId();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_getUserStatus
	*/
	this.getUserStatus = function() {
		return _user.getUserStatus();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_getUserType
	*/
	this.getUserType = function() {
		return _user.getUserType();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_isAppDeveloper
	*/
	this.isAppDeveloper = function() {
		return _user.isAppDeveloper();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_isAppManager
	*/
	this.isAppManager = function() {
		return _user.isAppManager();
	};

	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_isAway
	*/
	this.isAway = function() {
		return _user.isAway();
	};

	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_isChannelModerator
	*/
	this.isChannelModerator = function() {
		return _user.isChannelModerator();
	};

	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_isChannelOwner
	*/
	this.isChannelOwner = function() {
		return _user.isChannelOwner();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_isColorMuted
	*/
	this.isColorMuted = function() {
		return _user.isColorMuted();
	};

	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_isEventModerator
	*/
	this.isEventModerator = function() {
		return _user.isEventModerator();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_isLocked
	*/
	this.isLocked = function() {
		return _user.isLocked();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_isMuted
	*/
	this.isMuted = function() {
		return _user.isMuted();
	};	

	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_isOnline
	*/
	this.isOnline = function() {
		return _user.isOnline();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_isOnlineInChannel
	*/
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
		if(!isTypeOf(amount, 'KnuddelAmount')) {
			amount = new KnuddelAmount(amount);
		}
		
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
		Logger.info('Bot.publicMessage(message) is DEPRECATED');
		
		this.public(message);
	}
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_postMessage
	*/
	this.postMessage = function(user, message, topic) {
		Logger.info('Bot.postMessage(user, message, topic) is DEPRECATED');
		
		this.post(user, message, topic);
	}
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_privateMessage
	*/
	this.privateMessage = function(user, message) {
		Logger.info('Bot.privateMessage(user, message) is DEPRECATED');
		
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
		
		if(topic == undefined) {
			topic = '';
		}
		
		// send to online users
		if(nick == undefined) {
			Channel.getUsers().each(function(user) {
				user.sendPostMessage(topic, message);
			});
		} else {
			if(isTypeOf(nick, 'User')) {
				nick.sendPostMessage(topic, message);
			} else if(isTypeOf(nick, 'object') || isTypeOf(nick, 'array')) {
				nick.each(function(n) {
					Bot.post(n, message, topic);
				});
			} else {
				Users.get(nick).sendPostMessage(topic, message);
			}
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
			Channel.getUsers().each(function(user) {
				user.sendPrivateMessage(message);
			});
		} else {
			if(isTypeOf(nick, 'User')) {
				nick.sendPrivateMessage(message);
			} else if(isTypeOf(nick, 'object') || isTypeOf(nick, 'array')) {
				nick.each(function(n) {
					Bot.private(n, message);
				});
			} else {
				Users.get(nick).sendPrivateMessage(message);
			}
		}
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_exec
	*/
	this.exec = function(command) {
		_user.sendToChannel(command);
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_toString
	*/
	this.toString = function() {
		return '[KFramework Bot]';
	};
}());