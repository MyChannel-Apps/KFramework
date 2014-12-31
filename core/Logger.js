var Logger = (new function() {
	var _logger;
	
	function Logger() {
		_logger = KnuddelsServer.getDefaultLogger();
	};
	
	function getStrackTrace() {
		try {
			null.toString();
		} catch(e) {
			return prettyStackTrace(e.stack);
		}
		
		return '';
	}
	
	function prettyStackTrace(stack) {
		var lines	= stack.replace(/\t/g, '     ').replace(/\(anonymous\)/g, '').replace(/at (.*)@(.*): /g, 'at ').split('\n');
		var output	= '';
		
		for(var index in lines) {
			if(index <= 1) {
				continue;
			}
			
			output += '\n' + lines[index];
		}
		
		return output;
	}
	
	this.debug = function(message) {
		_logger.debug(message + getStrackTrace());
	};
	
	this.info = function(message) {
		_logger.info(message + getStrackTrace());
	};
	
	this.error = function(message) {
		_logger.error(message + getStrackTrace());
	};
	
	this.fatal = function(message) {
		_logger.fatal(message + getStrackTrace());
	};
	
	this.warn = function(message) {
		_logger.warn(message + getStrackTrace());
	};
	
	Logger();
}());