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

var Users = (new function() {
	this.get = function(nickname) {
		if(typeof(nickname) == 'number') {
			if(KnuddelsServer.canAccessUser(nickname)) {
				nickname	= KnuddelsServer.getUser(nickname);
			}
		}
		
		if(KnuddelsServer.userExists(nickname)) {
			var userId	= KnuddelsServer.getUserId(nickname);
			
			if(KnuddelsServer.canAccessUser(userId)) {
				return KnuddelsServer.getUser(userId);
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
					return (new function VirtualPersistence(uid) {
						_uid = uid;
						
						this.getString = function(key, defaults) { return DB.load('_userdb')[_uid][key] || defaults; };
						this.getNumber = function(key, defaults) { return DB.load('_userdb')[_uid][key] || defaults; };
						this.getObject = function(key, defaults) { return DB.load('_userdb')[_uid][key] || defaults; };

						this.deleteNumber = function(key) { 
							var userdb = DB.load('_userdb');
							delete userdb[_uid][key];
							DB.save('_userdb', userdb);
						};
						
						this.deleteObject = function(key) {
							var userdb = DB.load('_userdb');
							delete userdb[_uid][key];
							DB.save('_userdb', userdb);
						};
						
						this.deleteString = function(key) {
							var userdb = DB.load('_userdb');
							delete userdb[_uid][key];
							DB.save('_userdb', userdb);
						};
						
						this.setString = function(key, data) { 
							var userdb = DB.load('_userdb');
							userdb[_uid][key] = data;
							DB.save('_userdb', userdb);
						};
						
						this.setNumber = function(key, data) { 
							var userdb = DB.load('_userdb');
							userdb[_uid][key] = data;
							DB.save('_userdb', userdb);
						};
						
						this.setObject = function(key, data) {
							var userdb = DB.load('_userdb');
							userdb[_uid][key] = data;
							DB.save('_userdb', userdb);
						};
					}());
				};
				
				this.equals				= function(user) {
					Logger.warn('using User.equals() on virtual User-Object');
					/* TODO */
				};
				
				this.getAge				= function() { return -1; };
				this.getGender			= function() { return Gender.Unknown; };
				this.getKnuddelAmount	= function() { return new KnuddelAmount(0); };
				this.getNick			= function() { return _nickname; };
				this.getOnlineMinutes	= function() { return -1; };
				this.getProfileLink		= function() { return '°>_h' + _nickname.escapeKCode() + '|/w "|/serverpp "<°'; };
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
				this.sendPostMessage	= function(topic, message) {
					Logger.error('Can\t send message to a virtual User-Object!');
				};
				
				this.sendPrivateMessage	= function(message) {
					Logger.error('Can\t send message to a virtual User-Object!');
				};
			}());
		}
		
		return nickname;
	};
	
	this.toString = function(value) {
		switch(value) {
			case UserStatus.Newbie:
				return 'Newbie';
			break;
			case UserStatus.Family:
				return 'Family';
			break;
			case UserStatus.Stammi:
				return 'Stammi';
			break;
			case UserStatus.HonoryMember:
				return 'Ehrenz';
			break;
			case UserStatus.Admin:
				return 'Admin';
			break;
			case UserStatus.Sysadmin:
				return 'Sysadmin';
			break;
			case UserStatus.SystemBot:
				return 'Bot';
			break;
		}
		
		return value + '';
	};
}());