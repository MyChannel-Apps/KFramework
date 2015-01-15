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
*/

var Channel = (new function() {
	var _channel		= KnuddelsServer.getChannel();
	var _configuration	= _channel.getChannelConfiguration();
	var _rights			= _configuration.getChannelRights();
	
	this.getName = function() {
		return _channel.getChannelName();
	};
	
	this.getModerators = function() {
		return _rights.getChannelModerators();
	};
	
	this.getOwners = function() {
		return _rights.getChannelOwners();
	};
	
	this.getMods = function() {
		return _rights.getEventModerators();
	};
	
	/*
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
		
		var users	= [];
		var _users	= _channel.getOnlineUsers(types);
		
		// Return users if no other filters available
		if(
			!filter.exists('online') &&
			!filter.exists('inChannel') &&
			!filter.exists('away') &&
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
		
		_users.each(function(user, index) {
			// Is Online
			if(filter.online != undefined && filter.online && user.isOnline()) {
				users.push(user);
				return;
			}
			
			// Is Online in Channel
			if(filter.inChannel != undefined && filter.inChannel && user.isOnlineInChannel()) {
				users.push(user);
				return;
			}
			
			// Is Away
			if(filter.away != undefined && filter.away && user.isAway()) {
				users.push(user);
				return;
			}
			
			// App Developer
			if(filter.developer != undefined && filter.developer && user.isAppDeveloper()) {
				users.push(user);
				return;
			}
			
			// Channel Owner
			if(filter.owner != undefined && filter.owner && user.isChannelOwner()) {
				users.push(user);
				return;
			}
			
			// Event Moderator
			if(filter.event != undefined && filter.event && user.isEventModerator()) {
				users.push(user);
				return;
			}
			
			// ChannelModerator
			if(filter.cm != undefined && filter.cm && user.isChannelModerator()) {
				users.push(user);
				return;
			}
			
			// Status
			if(filter.status != undefined && filter.status.exists(user.getUserStatus())) {
				users.push(user);
				return;
			}
			
			// Gender
			if(filter.gender != undefined && filter.gender.exists(user.getGender())) {
				users.push(user);
				return;
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
		});
		
		return users;
	};
}());