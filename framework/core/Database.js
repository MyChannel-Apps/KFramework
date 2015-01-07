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

var DB	= (new function() {
	this.getUser = function(user) {
		Logger.info('DB.getUser(user) is DEPRECATED');
		return user.getPersistence();
	};
	
	this.getChannel = function() {
		Logger.info('DB.getChannel() is DEPRECATED');	
		return KnuddelsServer.getPersistence();
	};
	
	this.load = function(key, defaultValue, user) {
		if(key === undefined) {
			Logger.error('No key submitted');
			return false;
		}
		
		var selectedDB = KnuddelsServer.getPersistence();
		if(user != undefined) { 
			selectedDB = user.getPersistence();
		}
		
		switch(typeof defaultValue) {
			case 'string':
				return selectedDB.getString(key, defaultValue);
			break;	

			case 'number':
				return selectedDB.getNumber(key, defaultValue);
			break;
			
			case 'object':
				return selectedDB.getObject(key, defaultValue);
			break;
			
			case 'undefined':
				return selectedDB.getObject(key, {});
			break;
		}
		
		return false;
	};

	this.save = function(key, data, user) {
		if(key === undefined) {
			Logger.error('No key submitted');
			return false;
		}

		if(data === undefined) {
			Logger.error('No Data submitted');
			return false;
		}
		
		var selectedDB = KnuddelsServer.getPersistence();
		if(user != undefined) { 
			selectedDB = user.getPersistence();
		}
		
		switch(typeof data) {
			case 'string':
				selectedDB.setString(key, data);
			break;	

			case 'number':
				selectedDB.setNumber(key, data);
			break;
			
			case 'object':
				selectedDB.setObject(key, data);
			break;
		}
		return true;
	};
}());