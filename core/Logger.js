var Logger = (new function() {
	var _logger;
	
	function Logger() {
		_logger = KnuddelsServer.getDefaultLogger();
	};
	
	this.debug = function(message) {
		_logger.debug(message);
	};
	
	this.info = function(message) {
		_logger.info(message);
	};
	
	this.error = function(message) {
		_logger.error(message);
	};
	
	this.fatal = function(message) {
		_logger.fatal(message);
	};
	
	this.warn = function(message) {
		_logger.warn(message);
	};
	
	Logger();
}());