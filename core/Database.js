var DB	= (new function() {
	this.getUser = function(user) {
		return user.getPersistence();
	};
	
	this.getChannel = function() {
		return KnuddelsServer.getPersistence();
	};
}());