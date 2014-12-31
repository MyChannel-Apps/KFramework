require('framework/ui/KButton.js');
require('framework/ui/KLink.js');
require('framework/ui/KCountdown.js');

var Alignment = {
	LEFT:		'°>LEFT<°',
	MIDDLE:		'°>CENTER<°',
	CENTER:		'°>CENTER<°',
	RIGHT:		'°>RIGHT<°',
	JUSTIFY:	'°>JUSTIFY<°',
};

function KCode() {
	var _buffer = [];
	var _debug	= false;
	
	this.append = function(component) {
		_buffer.push(component);
	};
	
	this.newLine = function() {
		_buffer.push('°#°');
		
		// DEPRECATED!
		_buffer.push('#');
	};
	
	this.setAlignment = function(alignment) {
		_buffer.push(alignment);
	};	
	
	this.addImage = function(file) {
		// @ToDo to Image-Object with addition options (margin, hover, what ever)
		_buffer.push('°>' + KnuddelsServer.getFullImagePath(file) + '<°');
	};
	
	this.toString = function() {
		var string = '';
		
		for(var index in _buffer) {
			var component	= _buffer[index];
			
			if(component instanceof String) {
				string		+= component;
			} else {
				string		+= component.toString();
			}
		}
		
		if(_debug) {
			string = string.replace(/°/g, '\\°');
		}
		
		return string;
	};
};