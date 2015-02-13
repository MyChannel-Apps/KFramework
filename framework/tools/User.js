var User = User || {};
User.prototype = User.prototype || {};

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