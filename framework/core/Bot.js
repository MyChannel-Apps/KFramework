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

var Bot = (new function Bot() {
	var _user = KnuddelsServer.getDefaultBotUser();
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_getAge
	*/
	this.getAge = function getAge() { 
		return _user.getAge();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_getGender
	*/
	this.getGender = function getGender() { 
		return _user.getGender();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_getKnuddelAmount
	*/
	this.getKnuddelAmount = function getKnuddelAmount() {
		return _user.getKnuddelAmount();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_getNick
	*/
	this.getNick = function getNick() {
		return _user.getNick();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_getOnlineMinutes
	*/
	this.getOnlineMinutes = function getOnlineMinutes() {
		return _user.getOnlineMinutes();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_getProfileLink
	*/
	this.getProfileLink	= function getProfileLink(displayText) {
		return _user.getProfileLink(displayText == undefined ? this.getNick() : displayText);
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_getProfilePicture
	*/
	this.getProfilePicture	= function getProfilePicture() {
		return 'http://chat.knuddels.de/pics/fotos/knuddels.de?n=' + _user.getNick().urlencode();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_getReadme
	*/
	this.getReadme = function getReadme() {
		return _user.getReadme();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_getRegDate
	*/
	this.getRegDate = function getRegDate() {
		return _user.getRegDate();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_getUserId
	*/
	this.getUserId = function getUserId() {
		return _user.getUserId();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_getUserStatus
	*/
	this.getUserStatus = function getUserStatus() {
		return _user.getUserStatus();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_getUserType
	*/
	this.getUserType = function getUserType() {
		return _user.getUserType();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_isAppDeveloper
	*/
	this.isAppDeveloper = function isAppDeveloper() {
		return _user.isAppDeveloper();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_isAppManager
	*/
	this.isAppManager = function isAppManager() {
		return _user.isAppManager();
	};

	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_isAway
	*/
	this.isAway = function isAway() {
		return _user.isAway();
	};

	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_isChannelModerator
	*/
	this.isChannelModerator = function isChannelModerator() {
		return _user.isChannelModerator();
	};

	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_isChannelOwner
	*/
	this.isChannelOwner = function isChannelOwner() {
		return _user.isChannelOwner();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_isColorMuted
	*/
	this.isColorMuted = function isColorMuted() {
		return _user.isColorMuted();
	};

	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_isEventModerator
	*/
	this.isEventModerator = function isEventModerator() {
		return _user.isEventModerator();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_isLocked
	*/
	this.isLocked = function isLocked() {
		return _user.isLocked();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_isMuted
	*/
	this.isMuted = function isMuted() {
		return _user.isMuted();
	};	

	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_isOnline
	*/
	this.isOnline = function isOnline() {
		return _user.isOnline();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_isOnlineInChannel
	*/
	this.isOnlineInChannel = function isOnlineInChannel() {
		return _user.isOnlineInChannel();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_join
	*/
	this.join = function join() {
		_user.joinChannel();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_leave
	*/
	this.leave = function leave() {
		_user.leaveChannel();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_knuddel
		@TODO	UPDATE DOCS
	*/
	this.knuddel = function knuddel(user, amount, arg1, arg2) {
		if(!isTypeOf(amount, 'KnuddelAmount')) {
			amount = new KnuddelAmount(amount);
		}
		
		var params = {};
		
		if(arg1 !== undefined) {
			if(isTypeOf(arg1, 'string')) { params['displayReasonText'] = arg1; }
			if(isTypeOf(arg1, 'boolean')) { params['hidePublicMessage'] = !(arg1); }
		}

		if(arg2 !== undefined) {
			if(isTypeOf(arg2, 'string')) { params['displayReasonText'] = arg2; }
			if(isTypeOf(arg2, 'boolean')) { params['hidePublicMessage'] = !(arg2); }
		}		
		
		if(params.size()) {
			_user.transferKnuddel(user, amount, params);
		} else {
			_user.transferKnuddel(user, amount);
		}
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_getKnuddels
	*/
	this.getKnuddels = function getKnuddels() {
		return _user.getKnuddelAmount().asNumber();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_exception
	*/
	this.exception = function exception(exception) {
		_user.sendPublicMessage('°RR°_Exception:_°r°#' + (exception.message == undefined ? exception : exception.message));
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_publicMessage
	*/
	this.publicMessage = function publicMessage(message) {
		Logger.info('Bot.publicMessage(message) is DEPRECATED');
		
		this.public(message);
	}
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_postMessage
	*/
	this.postMessage = function postMessage(user, message, topic) {
		Logger.info('Bot.postMessage(user, message, topic) is DEPRECATED');
		
		this.post(user, message, topic);
	}
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_privateMessage
	*/
	this.privateMessage = function privateMessage(user, message) {
		Logger.info('Bot.privateMessage(user, message) is DEPRECATED');
		
		this.private(user, message);
	}
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_public
	*/
	this.public = function Public(message) {
		if(message instanceof KCode) {
			message = message.toString();
		}
		
		_user.sendPublicMessage(message);
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_post
	*/
	this.post = function post(nick, message, topic) {
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
	this.private = function Private(nick, message) {
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
				var nick = Users.get(nick);
				if(nick != undefined) {
					nick.sendPrivateMessage(message);
				}
			}
		}
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_exec
	*/
	this.exec = function exec(command) {
		_user.sendToChannel(command);
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Bot_toString
	*/
	this.toString = function toString() {
		return '[KFramework Bot]';
	};
}());