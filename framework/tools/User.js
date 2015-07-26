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

/*
	@docs	http://www.mychannel-apps.de/documentation/User_getID
*/
if(!User.prototype.getID) {
	Object.defineProperty(User.prototype, 'getID', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function getID() {
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
		value: function private(msg, delay) {
			Bot.private(this, msg, delay);
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
		value: function post(topic, text) {
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
		value: function getProfilePicture(width, height) {
			if(width == undefined) {
				width = 200;
			}
			
			if(height == undefined) {
				height = width;
			}
			
			if(this.hasProfilePhoto()) {
				if(this.getProfilePhoto != undefined) {
					return this.getProfilePhoto(width, height);
				}
				
				return 'http://chat.knuddels.de/pics/fotos/knuddels.de?n=' + this.getNick().urlencode();
			}
			
			if(this.getGender() == Gender.Female) {
				return 'nopic_79x79_f.jpg';
			}
			
			return 'nopic_79x79_m.jpg';
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
		value: function getKonto() {
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
		value: function getKn() {
			return KBank.getKn(this.getUserId());
		}
	});
}

/*
	@docs	TODO
*/
if(!User.prototype.getTotalKn) {
	Object.defineProperty(User.prototype, 'getTotalKn', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function getTotalKn() {
			return KBank.getTotalKn(this.getUserId());
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
		value: function addKn(kn) {
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
		value: function subKn(kn) {
			return KBank.subKn(this.getUserId(), kn);
		}
	});
}

if(!User.prototype.reqKn) {
	Object.defineProperty(User.prototype, 'reqKn', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function reqKn(kn, onSuccess, onError, reason) {
			return KBank.reqKn(this.getUserId(), kn, onSuccess, onError, reason);
		}
	});
}

if(!User.prototype.knuddel) {
	Object.defineProperty(User.prototype, 'knuddel', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function knuddel(amount, message) {
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

if(!User.prototype.getKnuddels) {
	Object.defineProperty(User.prototype, 'getKnuddels', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function getKnuddels() {
			return this.getKnuddelAmount().asNumber();
		}
	});
}

if(!User.prototype.isVirtual) {
	Object.defineProperty(User.prototype, 'isVirtual', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function isVirtual() {
			return false;
		}
	});
}