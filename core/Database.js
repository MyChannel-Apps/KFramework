var DB	= (new function() {
	this.getUser = function(user) {
		return user.getPersistence();
	};
	
	this.getChannel = function() {
		return KnuddelsServer.getPersistence();
	};
	
	this.load = function(key, defaultValue, user) {
		if(key === undefined) {
			Logger.error("No key submitted");
			return false;
		}
		
		selectedDB = this.getChannel();
		if(user != undefined) { 
			selectedDB = this.getUser(user);
		}
		
		switch(typeof defaultValue) {
			case 'string':
				return selectedDB.getString(key, defaultValue);
			break;	

			case 'number':
				return selectedDB.getNumber(key, defaultValue);
			break;
			
			case 'object':
			case 'undefined':			
				return selectedDB.getObject(key, defaultValue);
			break;
		}
		
		return false;
	};

	this.save = function(key, data, user) {
		if(key === undefined) {
			Logger.error("No key submitted");
			return false;
		}

		if(data === undefined) {
			Logger.error("No Data submitted");
			return false;
		}
		
		selectedDB = this.getChannel();
		if(user != undefined) { 
			selectedDB = this.getUser(user);
		}
		
		switch(typeof data) {
			case 'string':
				selectedDB.setString(key, data);
			break;	

			case 'number':
				selectedDB.setNumber(key, data);
			break;
			
			case 'object':
				selectedDB.getObject(key, data);
			break;
		}
		return true;
	};
	
	Logger.info("This shit is _DEPERECATED_!");
	return this.getChannel();
}());