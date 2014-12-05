function KButton(text) {
	var _text		= '';
	var _command	= '';
	var _properties	= {};
	
	function KButton(text) {
		if(text === undefined) {
			return;
		}
		
		_text = text;
	};
	
	/* TEXT */
	this.getText = function() {
		return _text;
	};
	
	this.setText = function(text) {
		_text = text;
	};
	
	/* ICON */
	this.setIcon = function(icon) {
		_properties.icon = icon;
	};
	
	this.removeIcon = function() {
		delete _properties.icon;
	};
	
	/* COLOR */
	this.setColor = function(color) {
		// @ToDo can be gradient like "120,230,90~60,170,25~24,96,1"
		_properties.color = color;
	};
	
	this.removeColor = function() {
		delete _properties.color;
	};
	
	/* HEIGHT */
	this.getHeight = function() {
		return _properties.height;
	};
	
	this.setHeight = function(height) {
		_properties.height = height;
	};
	
	this.removeHeight = function() {
		delete _properties.height;
	};
	
	/* WIDTH */
	this.getWidth = function() {
		return _properties.width;
	};
	
	this.setWidth = function(width) {
		_properties.width = width;
	};
	
	this.removeWidth = function() {
		delete _properties.width;
	};
	
	/* SIZE */
	this.setSize = function(width, height) {
		this.setWidth(width);
		this.setHeight(height);
	};
	
	this.removeSize = function() {
		this.removeWidth();
		this.removeHeight();
	};
	
	/* POSITION */
	this.getX = function() {
		return _properties.mx;
	};
	
	this.setX = function(x) {
		_properties.mx = x;
	};
	
	this.getY = function() {
		return _properties.my;
	};
	
	this.setY = function(y) {
		_properties.my = y;
	};
	
	this.setPosition = function(x, y) {
		this.setX(x);
		this.setY(y);
	};
	
	/* TEXTBORDER */
	this.useTextborder = function(bool) {
		if(bool) {
			_properties.textborder = '1';
		} else {
			delete _properties.textborder;
		}
	};
	
	/* @ToDo TEXTCOLOR */
	
	this.toString = function() {
		var string = '°>{button}';
		if(_text.length > 0) {
			string += _text + '||';
		}
		
		if(_command.length > 0) {
			string += 'call|' + _command;
		}
		
		for(var name in _properties) {
			string += name + '|' + _properties[name];
		}
		
		string += '<°';
		
		return string;
	};
	
	
	// Call the Constructor
	KButton(text);
}