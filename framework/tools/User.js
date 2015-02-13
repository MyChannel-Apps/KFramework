var User = User || {};
User.prototype = User.prototype || {};

if(!User.prototype.private) {
	User.prototype.private = function(msg) {
		this.sendPrivateMessage(msg);		
	};
}

if(!User.prototype.post) {
	User.prototype.post = function(topic, text) {
		this.sendPostMessage(topic, text);		
	};
}

if(!User.prototype.getProfilePicture) {
	User.prototype.getProfilePicture = function() {
		return 'http://chat.knuddels.de/pics/fotos/knuddels.de?n=' + this.getNick().urlencode();
	};
}