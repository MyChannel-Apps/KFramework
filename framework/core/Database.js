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
	@docs		http://www.mychannel-apps.de/documentation/core/database
*/

var DB	= (new function() {
	/*
		@docs	http://www.mychannel-apps.de/documentation/DB_getUser
	*/
	this.getUser = function(user) {
		Logger.info('DB.getUser(user) is DEPRECATED');
		
		return user.getPersistence();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/DB_getChannel
	*/
	this.getChannel = function() {
		Logger.info('DB.getChannel() is DEPRECATED');	
		
		return KnuddelsServer.getPersistence();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/DB_load
	*/
	this.load = function(key, defaultValue, user) {
		if(key === undefined) {
			Logger.error('No key submitted');
			
			return false;
		}
		
		var _db = KnuddelsServer.getPersistence();
		
		if(user != undefined) { 
			_db = user.getPersistence();
		}
		
		switch(typeof defaultValue) {
			case 'string':
				return _db.getString(key, defaultValue);
			break;
			case 'number':
				return _db.getNumber(key, defaultValue);
			break;
			case 'object':
				return _db.getObject(key, defaultValue);
			break;
			case 'undefined':
				return _db.getObject(key, {});
			break;
		}
		
		return false;
	};

	/*
		@docs	http://www.mychannel-apps.de/documentation/DB_save
	*/
	this.save = function(key, data, user) {
		if(key === undefined) {
			Logger.error('No key submitted');
			return false;
		}

		if(data === undefined) {
			Logger.error('No Data submitted');
			return false;
		}
		
		var _db = KnuddelsServer.getPersistence();
		
		if(user != undefined) { 
			_db = user.getPersistence();
		}
		
		switch(typeof data) {
			case 'string':
				_db.setString(key, data);
			break;
			case 'number':
				_db.setNumber(key, data);
			break;
			case 'object':
				_db.setObject(key, data);
			break;
		}
		return true;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/DB_check
	*/
	this.check = function(key, data, user) {
		if(key === undefined) {
			Logger.error('No key submitted');
			return false;
		}
		
		if(data === undefined) {
			Logger.error('No Data submitted');
			return false;
		}
		
		var _db = KnuddelsServer.getPersistence();
		
		if(user != undefined) {
			_db = user.getPersistence();
		}
		
		switch(typeof data) {
			case 'string':
				return _db.hasString(key);
			break;
			case 'number':
				return _db.hasNumber(key);
			break;
			case 'object':
				return _db.hasObject(key);
			break;
		}
		
		return false;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/DB_delete
	*/
	this.delete = function(key, user) {
		if(key === undefined) {
			Logger.error('No key submitted');
			return false;
		}
		
		var _db = KnuddelsServer.getPersistence();
		
		if(user != undefined) { 
			_db = user.getPersistence();
		}
		
		if(_db.hasString(key)) {
			_db.deleteString(key);
		}
		
		if(_db.hasNumber(key)) {
			_db.deleteNumber(key);
		}
		
		if(_db.hasObject(key)) {
			_db.deleteObject(key);
		}
	};
	
	/*
		@ToDo	Method conflict on Docs
		@docs	http://www.mychannel-apps.de/documentation/DB_sum
	*/
	this.sum = function(key) {
		if(key === undefined) {
			Logger.error('No key submitted');
			return false;
		}
		
		return UserPersistenceNumbers.getSum(key);
	};
	
	/*
		@ToDo
		@docs	http://www.mychannel-apps.de/documentation/DB_count
	*/
	this.count = function(key, from, to) {
		if(key === undefined) {
			Logger.error('No key submitted');
			return false;
		}
		var options = {};
		
		if(from != undefined && typeof(from) == 'number') {
			options['minimumValue'] = from;
		}
		
		if(to != undefined && typeof(to) == 'number') {
			options['maximumValue'] = to;
		}
		
		return UserPersistenceNumbers.getCount(key, options);
	};
	
	/*
		@ToDo
		@docs	http://www.mychannel-apps.de/documentation/DB_sorted
	*/
	this.sorted = function(key, sortBy, count, page) {
		if(key === undefined) {
			Logger.error('No key submitted');
			return false;
		}
		var options = {};
		
		if(sortBy != undefined) {
			options['ascending'] = (sortBy == 'ASC') ? true : false;
		}
		
		if(count != undefined && typeof(count) == 'number') {
			options['count'] = count;
		}

		if(page != undefined && typeof(page) == 'number') {
			options['page'] = page;
		}
				
		return UserPersistenceNumbers.getSortedEntries(key, options);
	};
	
	// getSortedEntriesAdjacent

	/*
		@ToDo
		@docs	http://www.mychannel-apps.de/documentation/DB_users
	*/	
	this.users = function(key, callback, sortBy, from, to) {
		if(key === undefined) {
			Logger.error('No key submitted');
			return false;
		}
		
		if(callback === undefined) {
			Logger.error('No callback submitted');
			return false;
		}
		var options = {};
		
		if(sortBy != undefined) {
			options['ascending'] = (sortBy == 'ASC') ? true : false;
		}
		
		if(from != undefined && typeof(from) == 'number') {
			options['minimumValue'] = from;
		}
		
		if(to != undefined && typeof(to) == 'number') {
			options['maximumValue'] = to;
		}
				
		return UserPersistenceNumbers.each(key, callback, options);
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/DB_toString
	*/
	this.toString = function() {
		return '[KFramework Database]';
	};
}());