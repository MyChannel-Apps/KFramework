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

var Channel = (new function() {
	var _channel		= KnuddelsServer.getChannel();
	var _configuration	= _channel.getChannelConfiguration();
	var _restrictions	= _channel.getChannelRestrictions();
	var _rights			= _configuration.getChannelRights();
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Channel_getChannel
	*/
	this.getName = function() {
		return _channel.getChannelName();
	};
	
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
	
	this.getCMutes = function() {
		return _restrictions.getColorMutedUsers();
	};
	
	this.getMutes = function() {
		return _restrictions.getMutedUsers();
	};
	
	this.getCLs = function() {
		return _restrictions.getLockedUsers();
	};
	
	this.onDev = function() {
		return KnuddelsServer.isTestSystem();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Channel_getUsers
		
		Example Filter:
		{
			bot:		true,		// AppBot or SystemBot
			cm:			true,
			owner:		true,
			event:		true,
			online:		true,
			inChannel:	true,
			away:		true,
			developer:	true,
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
		}
	*/
	this.getUsers = function(filter) {
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
		if(
			!filter.exists('online') &&
			!filter.exists('inChannel') &&
			!filter.exists('away') &&
			!filter.exists('cmute') &&
			!filter.exists('mute') &&
			!filter.exists('cl') &&						
			!filter.exists('developer') &&
			!filter.exists('owner') &&
			!filter.exists('event') &&
			!filter.exists('cm') &&
			!filter.exists('status') &&
			!filter.exists('gender') &&
			!filter.exists('age') &&
			!filter.exists('nickname') &&
			!filter.exists('minutes') &&
			!filter.exists('readme')
		) {
			return _users;
		}

		//_users.each(function(user, index) {
		for(var index = 0; index < _users.length; index++) {
			// Is Online
			if(filter.online != undefined && filter.online != _users[index].isOnline()) {
				continue;
			}
			
			// Is Online in Channel
			if(filter.inChannel != undefined && filter.inChannel != _users[index].isOnlineInChannel()) {
				continue;
			}
			
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
			
			// Gender
			if(filter.gender != undefined && !filter.gender.exists(_users[index].getGender())) {
			}
			
			// Age
			if(filter.age != undefined) {
				// user.getAge()
			}
			
			// Nickname
			if(filter.nickname != undefined) {
				// user.getNick();
			}				
			
			// Minutes
			if(filter.minutes != undefined) {
				// user.getOnlineMinutes();
			}
			
			// Readme
			if(filter.readme != undefined) {
				// user.getReadme();
			}

			users.push(_users[index]);
		}
		return users;
	};
	
	this.toString = function() {
		return '[KFramework Channel]';
	};
}());