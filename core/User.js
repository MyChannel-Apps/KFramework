var Users = (new function() {
	this.get = function(nickname) {
		if(KnuddelsServer.userExists(nickname)) {
			var userId	= KnuddelsServer.getUserId(nickname);
			
			if(KnuddelsServer.canAccessUser(userId)) {
				nickname	= KnuddelsServer.getUser(userId);
			}
		}
		
		if(typeof(nickname) == 'string') {
			return (new function() {
				var _nickname			= nickname;
				this.virtual			= true;
				this.getPersistence		= function() {
					return (new function Persistence() {
						var _data = {};
						
						this.deleteNumber = function(key) { delete _data[key]; };
						this.deleteObject = function(key) { delete _data[key]; };
						this.deleteString = function(key) { delete _data[key]; };
						this.getString = function(key, defaults) { return _data[key] || defaults; };
						this.getNumber = function(key, defaults) { return _data[key] || defaults; };
						this.getObject = function(key, defaults) { return _data[key] || defaults; };
					}());
				};
				this.getNick			= function() { return _nickname; };
				this.getUserId			= function() { return -1; };
				this.getKnuddelAmount	= function() { return new KnuddelAmount(-1); };
				this.sendPrivateMessage	= function(message) {};
			}());
		}
		
		return nickname;
	};
}());