function VirtualChannel() {
	var _config			= new VirtualChannelConfiguration();
	var _restrictions	= new VirtualChannelRestrictions();
	
	this.getChannelConfiguration = function() {
		return _config;
	};
	
	this.getChannelRestrictions = function() {
		return _restrictions;
	};
};

function VirtualChannelConfiguration() {
	var _rights = new VirtualChannelRights();
	
	this.getChannelRights = function() {
		return _rights;
	};
};

function VirtualChannelRights() {
	this.getChannelOwners = function() {
		return [];
	};
};

function VirtualChannelRestrictions() {
	
};

function VirtualPersistence() {
	var _objects = {};
	
	this.getObject = function(name, default_value) {
		if(_objects[name] == undefined) {
			_objects[name] = default_value;
		}
		
		return _objects[name];
	};
	
	this.setObject = function(name, value) {
		_objects[name] = value;
	};
	
	this.getNumber = function(name, default_value) {
		return parseInt(this.getObject(name, default_value));
	};
	
	this.setNumber = function(name, value) {
		this.setObject(name, value);
	};
	
	this.getString = function() {
		return '' + this.getObject(name, default_value);
	};
	
	this.setString = function(name, value) {
		this.setObject(name, value);
	};
};

function VirtualLogger() {	
	this.warn = function(message) {
		console.warn(message);
	};
	
	this.debug = function(message) {
		console.debug(message);
	};
	
	this.error = function(message) {
		console.error(message);
	};
	
	this.fatal = function(message) {
		console.error(message);
	};
	
	this.info = function(message) {
		console.info(message);
	};
};

var KnuddelsServer = (new function() {
	var _channel		= new VirtualChannel();
	var _logger			= new VirtualLogger();
	var _persistence	= new VirtualPersistence();
	
	this.getDefaultLogger = function() {
		return _logger;
	};
	
	this.getDefaultBotUser = function() {};
	
	this.getChannel = function() {
		return _channel;
	};
	
	this.getAppDeveloper = function() {
		return 'Unknown';
	};
	
	this.getPersistence = function() {
		return _persistence;
	};
	
	this.getFullImagePath = function(file) {
		return 'http://example.com/' + file;
	};
}());

function require(file) {
	file = '../' + file;
	console.info('load: ' + file);	
	var script = document.createElement('script');
	var object = document.getElementsByTagName('script')[0];
	script.async = true;
	script.src = file;
	object.parentNode.insertBefore(script, object);
};

function InvokeLater(callback) {
	var watcher = setInterval(function() {
		if(KCode != undefined && Array.each != undefined) {
			clearInterval(watcher);
			callback();
		}
	}, 500);
};