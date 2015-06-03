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
	
	@author		Adrian Preuß <Bizarrus>
	@docs		http://www.mychannel-apps.de/documentation/core/channel
*/

var Background = {
	/* Strecken */
	SCALED:							0,
	
	/* Skaliert (Füllend, Zentriert, Mode1) */
	SCALE_FILLED_MODE1:				6,
	
	/* Skaliert (Füllend, Zentriert, Mode2) */
	SCALE_FILLED_MODE2:				10,
	
	/* Skaliert (Füllend, Zentriert, Mode3) */
	SCALE_FILLED_MODE3:				54,
	
	/* Skaliert (Komplett sichtbar, Zentriert) */
	SCALE_COMPLETE_CENTERED:		7,
	
	/* Skaliert auf Höhe (Rechts) */
	SCALE_HEIGHT_RIGHT:				61,
	
	/* Skaliert auf Breite (Oben) */
	SCALE_HEIGHT_TOP:				40,
	
	/* Skaliert auf Breite (Unten) */
	SCALE_HEIGHT_BOTTOM:			56,
	
	/* Gekachelt */
	TILED:							17,
	
	/* Gekachelt (2fache Größe) */
	TILED_ZOOM_X2:					33,
	
	/* Gekachelt (3fache Größe) */
	TILED_ZOOM_X3:					59,
		
	/* Gekachelt (Zeilenweise versetzt) */
	TILED_OFFSET_HORIZONTAL:		18,
	
	/* Gekachelt (Zeilenweise, 2fache Größe) */
	TILED_OFFSET_ZOOM_X2:			34,
	
	/* Gekachelt (Zeilenweise, 3fache Größe) */
	TILED_OFFSET_ZOOM_X3:			50,
	
	/* Gekachelt (Spaltenweise) */
	TILED_OFFSET_VERTICAL:			19,
	
	/* Gekachelt (Spaltenweise, 2fache Größe) */
	TILED_OFFSET_VERTICAL_ZOOM_X2:	34,
	
	/* Gekachelt (Spaltenweise, 3fache Größe) */
	TILED_OFFSET_VERTICAL_ZOOM_X3:	50,
	
	/* Zentriert */
	CENTERED:						20,
	
	/* Zentriert (2fache Größe) */
	CENTERED_ZOOM_X2:				36,
	
	/* Zentriert (3fache Größe) */
	CENTERED_ZOOM_X3:				52
};

var Channel = (new function() {
	var _channel		= KnuddelsServer.getChannel();
	var _configuration	= _channel.getChannelConfiguration();
	var _restrictions	= _channel.getChannelRestrictions();
	var _rights			= _configuration.getChannelRights();
	var _info			= _configuration.getChannelInformation();
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Channel_getChannel
	*/
	this.getName = function() {
		return _channel.getChannelName();
	};
	
	/*
		@docs	TODO
	*/
	this.usersOnline = function(filter) {
		return Channel.getUsers(filter).size();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Channel_getOwner
	*/
	this.getOwner = function() {
		var owners	= this.getOwners();
		var owner	= undefined;
		
		owners.each(function(user, index) {
			if(user.isOnlineInChannel()) {
				owner = user;
				return;
			}
		});
		
		return owner;
	};
	
	/*
		@docs	TODO
	*/
	this.setBackground = function(image, style, user, text) {
		Bot.private(user, '°>{bgimage}' + image + '|' + (style == undefined ? Background.SCALED : style) + '<°' + (text == undefined ? 'Das Hintergrundbild wird geändert' : text));
	};
	
	/*
		@docs	TODO
	*/
	this.getTopic = function() {
		return _info.getTopic();
	};
	
	/*
		@docs	TODO
	*/
	this.setTopic = function(text, showLive) {
		_info.setTopic(text || '', showLive || true);
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Channel_getModerators
	*/
	this.getModerators = function() {
		return _rights.getChannelModerators();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Channel_getOwners
	*/
	this.getOwners = function() {
		return _rights.getChannelOwners();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Channel_getMods
	*/
	this.getMods = function() {
		return _rights.getEventModerators();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Channel_getCMutes
	*/
	this.getCMutes = function() {
		return _restrictions.getColorMutedUsers();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Channel_getMutes
	*/
	this.getMutes = function() {
		return _restrictions.getMutedUsers();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Channel_getCLs
	*/
	this.getCLs = function() {
		return _restrictions.getLockedUsers();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Channel_onDev
	*/
	this.onDev = function() {
		return KnuddelsServer.getChatServerInfo().isTestSystem();
	};
	
	/*
		@docs	TODO
	*/
	this.isVideoChannel = function() {
		return _channel.isVideoChannel();
	};

	/*
		@docs	TODO
	*/
	this.getServer = function() {
		return KnuddelsServer.getChatServerInfo().getServerId();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Channel_getUsers
		@docs	TODO
		Example Filter:
		{
			bot:		true,		// AppBot or SystemBot
			cm:			true,
			owner:		true,
			event:		true,
			away:		true,
			developer:	true,
			include:	[], //array of uid´s or User-Objects
			exclude:	[], //array of uid´s or User-Objects
			status:		[
							Status.Newbie,
							Status.Family,
							Status.Stammi,
							Status.Ehrenz,
							Status.Admin,
							Status.Sysadmin,
							Status.Bot
						],
			gender:		[
							Gender.Male,
							Gender.Female,
							Gender.Unknown
						]
			video:		true,
			appContent: AppContent.overlayContent,
			clientType:	[ClientType.Applet],
			costum:		function(user) {
				return user.getNick().startsWith('Penis');
			}
		}
	*/
	this.getUsers = function(filter, randomOne) {
		filter 		= filter || {};
		var types	= [UserType.Human];
		
		if(filter.bot != undefined) {
			if(filter.bot) {
				types.push(UserType.AppBot);
				types.push(UserType.SystemBot);
			}
		}
		
		var users = [];
		var _users	= _channel.getOnlineUsers(types);
		
		// Return users if no other filters available
		if(!filter.size()) {
			return (randomOne) ? RandomOperations.getRandomObject(_users) : _users;
		}

		//_users.each(function(user, index) {
		for(var index = 0; index < _users.length; index++) {
			// Is Away
			if(filter.away != undefined && filter.away != _users[index].isAway()) {
				continue;
			}
			
			// Is CMuted
			if(filter.cmute != undefined && filter.cmute != _users[index].isColorMuted()) {
				continue;
			}
			
			// Is Muted
			if(filter.mute != undefined && filter.mute != _users[index].isMuted()) {
				continue;
			}
			
			// Is CMuted
			if(filter.cl != undefined && filter.cl != _users[index].isLocked()) {
				continue;
			}
			
			// App Developer
			if(filter.developer != undefined && filter.developer != _users[index].isAppDeveloper()) {
				continue;
			}
			
			// App Manager
			if(filter.manager != undefined && filter.manager != _users[index].isAppManager()) {
				continue;
			}
			
			// Channel Owner
			if(filter.owner != undefined && filter.owner != _users[index].isChannelOwner()) {
				continue;
			}
			
			// Event Moderator
			if(filter.event != undefined && filter.event != _users[index].isEventModerator()) {
				continue;
			}
			
			// ChannelModerator
			if(filter.cm != undefined && filter.cm != _users[index].isChannelModerator()) {
				continue;
			}
			
			// Status
			if(filter.status != undefined && !filter.status.exists(_users[index].getUserStatus())) {
				continue;
			}

			// Blacklist Filter
			if(filter.exclude != undefined && filter.exclude.size()) {
				var result = filter.exclude.each(function(entry) {
					if(isTypeOf(entry) == 'User' && _users[index].equals(entry)) {
						return false;
					} else if(_users[index].getUserId() == entry) {
						return false;
					}
				});
				
				if(!result) {
					continue;
				}
			}
			
			// Whitelist Filter
			if(filter.include != undefined && filter.include.size()) {
				filter.include.each(function(entry) {
					if(isTypeOf(entry) == 'User' && _users[index].equals(entry)) {
						return false;
					} else if(_users[index].getUserId() == entry) {
						return false;
					}
				});
				
				if(result) {
					continue;
				}
			}
			
			// Gender
			if(filter.gender != undefined && !filter.gender.exists(_users[index].getGender())) {
				continue;
			}

			// isStreamingVideo
			if(filter.video != undefined && filter.video != _users[index].isStreamingVideo()) {
				continue;
			}
			
			//getClientType 
			if(filter.clientType != undefined && !filter.clientType.exists(_users[index].getClientType())) {
				continue;
			}
			
			// canSendAppContent
			if(filter.appContent != undefined && !_users[index].canSendAppContent(filter.appContent)) {
				continue;
			}
			
			if(filter.custom != undefined && typeof(filter.custom) == 'function' && !filter.custom.call(_users[index], [_users[index]])) {
				continue;
			}

			users.push(_users[index]);
		}
		return (randomOne) ? RandomOperations.getRandomObject(users) : users;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Channel_toString
	*/
	this.toString = function() {
		return '[KFramework Channel]';
	};
}());