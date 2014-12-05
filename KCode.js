require('framework/ui/KButton.js');

function KCode() {
	var _buffer = [];
	var _debug	= false;
	
	this.append = function(component) {
		_buffer.push(component);
	};
	
	this.newLine = function() {
		_buffer.push('#');
	};	
	
	this.toString = function() {
		var string = '';
		
		for(var index in _buffer) {
			try {
				var component	= _buffer[index];
				
				if(component instanceof String) {
					string		+= component;
				} else {
					string		+= component.toString();
				}
			} catch(e) {
				Exceptions.push(e);
			}
		}
		
		if(_debug) {
			string = string.replace(/°/g, '\\°');
		}
		
		return string;
	};
};