var Users = (new function() {
	this.get = function(nickname) {
		if(KnuddelsServer.userExists(nickname)) {
			var userId	= KnuddelsServer.getUserId(nickname);
			
			if(KnuddelsServer.canAccessUser(userId)) {
				nickname	= KnuddelsServer.getUser(userId);
			}
		} else {
			return undefined;
		}
		
		if(typeof(nickname) == 'string') {
			return (new function() {
				var _nickname			= nickname;
				var _uid 				= userId;
				this.virtual			= true;
				this.getPersistence		= function(_uid) {
					return (new function Persistence(uid) {
						_uid = uid;
						
						this.getString = function(key, defaults) { return DB.load('userdb')[_uid][key] || defaults; };
						this.getNumber = function(key, defaults) { return DB.load('userdb')[_uid][key] || defaults; };
						this.getObject = function(key, defaults) { return DB.load('userdb')[_uid][key] || defaults; };

						this.deleteNumber = function(key) { 
							userdb = DB.load('userdb');
							delete userdb[_uid][key];
							DB.save('userdb', userdb);
						};
						this.deleteObject = function(key) {
							userdb = DB.load('userdb');
							delete userdb[_uid][key];
							DB.save('userdb', userdb);
						};
						this.deleteString = function(key) {
							userdb = DB.load('userdb');
							delete userdb[_uid][key];
							DB.save('userdb', userdb);
						};
						this.setString = function(key, data) { 
							userdb = DB.load('userdb');
							userdb[_uid][key] = data;
							DB.save('userdb', userdb);
						};
						this.setNumber = function(key, data) { 
							userdb = DB.load('userdb');
							userdb[_uid][key] = data;
							DB.save('userdb', userdb);
						};
						this.setObject = function(key, data) {
							userdb = DB.load('userdb');
							userdb[_uid][key] = data;
							DB.save('userdb', userdb);
						};
					}());
				};
				this.equals				= function(user) {/* TODO */};
				this.getAge				= function() { return -1; };
				this.getGender			= function() { return Gender.Unknown; };
				this.getKnuddelAmount	= function() { return new KnuddelAmount(0); };
				this.getNick			= function() { return _nickname; };
				this.getOnlineMinutes	= function() { return -1; };
				this.getProfileLink		= function() { return '°>_h'+_nickname.escapeKCode()+'|/w "|/serverpp "<°'; };
				this.getReadme			= function() { return ''; };
				this.getRegDate			= function() { return new Date(0); };
				this.getUserId			= function() { return _uid; };
				this.getUserStatus		= function() { return UserStatus.Newbie; };
				this.getUserType		= function() { return UserType.Human; };
				this.isAppDeveloper		= function() { return false; };
				this.isAway				= function() { return false; };
				this.isChannelModerator	= function() { return false; };
				this.isChannelOwner		= function() { return false; };
				this.isEventModerator	= function() { return false; };
				this.isOnline			= function() { return false; };
				this.isOnlineInChannel	= function() { return false; };
				this.sendPostMessage	= function(topic, message) {};
				this.sendPrivateMessage	= function(message) {};
			}());
		}
		
		return nickname;
	};
}());