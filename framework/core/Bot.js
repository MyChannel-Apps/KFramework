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
		return _user.getProfileLink(displayText);
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
		Logger.info('Bot.publicMessage(message) is DEPRECATED');
		this.public(message);
	}
	
	this.postMessage = function(user, message, topic) {
		Logger.info('Bot.postMessage(user, message, topic) is DEPRECATED');
		this.post(user, message, topic);
	}
	
	this.privateMessage = function(user, message) {
		Logger.info('Bot.privateMessage(user, message) is DEPRECATED');
		this.private(user, message);
	}
	
	this.public = function(message) {
		if(message instanceof KCode) {
			message = message.toString();
		}
		_user.sendPublicMessage(message);
	};
	
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
			nick.sendPrivateMessage(message);
		}
	};
	
	this.exec = function(command) {
		_user.sendToChannel(command);
	};
}());