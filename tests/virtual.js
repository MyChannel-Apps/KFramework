function VirtualChannel() {
	var _config = new VirtualChannelConfiguration();
	
	this.getChannelConfiguration = function() {
		return _config;
	};
};

function VirtualChannelConfiguration() {
	var _rights = new VirtualChannelRights();
	
	this.getChannelRights = function() {
		return _rights;
	};
};

function VirtualChannelRights() {

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
	var _channel = new VirtualChannel();
	var _logger = new VirtualLogger();
	
	this.getDefaultLogger = function() {
		return _logger;
	};
	
	this.getDefaultBotUser = function() {};
	
	this.getChannel = function() {
		return _channel;
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