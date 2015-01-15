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
	
	@author		Adrian Preuß <Bizarrus>
*/

function KButton(text, command) {
	var _text		= '';
	var _command	= '';
	var _properties	= {};
	
	function KButton(text, command) {
		if(text === undefined) {
			return;
		}
		
		_text = text;
		if(command === undefined) {
			return;
		}
		
		_command = command;
	};
	
	/* COMMAND */
	this.getCommand = function() {
		return _command;
	};
	
	this.setCommand = function(command) {
		_command = command;
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
		if(icon.indexOf('https://') == 0 || icon.indexOf('http://') == 0) {
			Logger.info("Can\t use http:// or https:// URL\'s on Buttons because the Path is implemented on the Client side!");
		}
		
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
	
	/* DISABLED */
	this.setEnabled = function(bool) {
		if(bool == false) {
			_properties.enabled = '0';
		} else {
			delete _properties.enabled;
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
		
		_properties.each(function(value, name) {
			string += '|' + name + '|' + value;
		});
		
		string += '<°';
		
		return string;
	};
	
	
	// Call the Constructor
	KButton(text, command);
}