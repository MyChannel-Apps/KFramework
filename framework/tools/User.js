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
	
	@author		Christoph Kühl <djchrisnet>, Adrian Preuß <Bizarrus>
	@docs		http://www.mychannel-apps.de/documentation/tools/user
*/

var User		= User || {};
User.prototype	= User.prototype || {};

/*
	@docs	http://www.mychannel-apps.de/documentation/User_getID
*/
if(!User.prototype.getID) {
	Object.defineProperty(User.prototype, 'getID', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function() {
			return this.getUserId();
		}
	});
}

/*
	@docs	http://www.mychannel-apps.de/documentation/User_private
*/
if(!User.prototype.private) {
	Object.defineProperty(User.prototype, 'private', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function(msg) {
			this.sendPrivateMessage(msg);
		}
	});
}

/*
	@docs	http://www.mychannel-apps.de/documentation/User_post
*/
if(!User.prototype.post) {
	Object.defineProperty(User.prototype, 'post', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function(topic, text) {
			this.sendPostMessage(topic, text);
		}
	});
}

/*
	@docs	http://www.mychannel-apps.de/documentation/User_getProfilePicture
*/
if(!User.prototype.getProfilePicture) {
	Object.defineProperty(User.prototype, 'getProfilePicture', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function() {
			return 'http://chat.knuddels.de/pics/fotos/knuddels.de?n=' + this.getNick().urlencode();
		}
	});
}

/*
	@docs	http://www.mychannel-apps.de/documentation/User_getKonto
*/
if(!User.prototype.getKonto) {
	Object.defineProperty(User.prototype, 'getKonto', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function() {
			return KBank.getKonto(this.getUserId());
		}
	});
}

/*
	@docs	http://www.mychannel-apps.de/documentation/User_getKn
*/
if(!User.prototype.getKn) {
	Object.defineProperty(User.prototype, 'getKn', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function() {
			return KBank.getKn(this.getUserId());
		}
	});
}

/*
	@docs	http://www.mychannel-apps.de/documentation/User_addKn
*/
if(!User.prototype.addKn) {
	Object.defineProperty(User.prototype, 'addKn', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function(kn) {
			return KBank.addKn(this.getUserId(), kn);
		}
	});
}

/*
	@docs	http://www.mychannel-apps.de/documentation/User_subKn
*/
if(!User.prototype.subKn) {
	Object.defineProperty(User.prototype, 'subKn', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function(kn) {
			return KBank.subKn(this.getUserId(), kn);
		}
	});
}

if(!User.prototype.knuddel) {
	Object.defineProperty(User.prototype, 'knuddel', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function(amount, message) {
			if(amount === undefined) {
				return false;
			}
			
			if(message === undefined) {
				Bot.knuddel(this, amount);
			} else {
				Bot.knuddel(this, amount, message);
			}
			return true;
		}
	});
}