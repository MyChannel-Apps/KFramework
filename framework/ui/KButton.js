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
	@docs	http://www.mychannel-apps.de/documentation/ui/button
*/

function KButton(text, command) {
	var _text			= '';
	var _id				= -1;
	var _command		= '';
	var _properties		= {};
	var _fix_escaping	= false;
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KButton_constructor
	*/
	function KButton(text, command) {
		if(text === undefined) {
			return;
		}
		
		_text = text;
		if(command === undefined) {
			return;
		}
		
		_command = command;
		return this;		
	};
	
	this.fixEscaping = function fixEscaping(state) {
		_fix_escaping = state;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KButton_setID
	*/
	this.setID = function setID(id) {
		_id = id;
		return this;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KButton_getID
	*/
	this.getID = function getID() {
		return _id;
	};
	
	/* COMMAND */
	/*
		@docs	http://www.mychannel-apps.de/documentation/KButton_getCommand
	*/
	this.getCommand = function getCommand() {
		return _command;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KButton_setCommand
	*/
	this.setCommand = function setCommand(command) {
		_command = command;
		return this;
	};
	
	/* TEXT */
	/*
		@docs	http://www.mychannel-apps.de/documentation/KButton_getText
	*/
	this.getText = function getText() {
		return _text;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KButton_getText
	*/
	this.setText = function setText(text) {
		_text = text;
		return this;
	};

	/* Properties */
	/*
		@docs	TODO
	*/
	this.getProperties = function getProperties() {
		return _properties;
	};
	
	/*
		@docs	TODO
	*/
	this.setProperties = function setProperties(properties) {
		_properties = properties;
		return this;
	};
	
	/* ICON */
	/*
		@docs	http://www.mychannel-apps.de/documentation/KButton_setIcon
	*/
	this.setIcon = function setIcon(icon) {
		if(icon.startsWith('https://') || icon.startsWith('http://')) {
			icon = '../' + icon;
		}
		
		_properties.icon = icon;
		return this;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KButton_removeIcon
	*/
	this.removeIcon = function removeIcon() {
		delete _properties.icon;
		return this;
	};
	
	/* COLOR */
	/*
		@docs	http://www.mychannel-apps.de/documentation/KButton_setColor
	*/
	this.setColor = function setColor(color) {
		// @ToDo can be gradient like "120,230,90~60,170,25~24,96,1"
		_properties.color = color;
		return this;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KButton_removeColor
	*/
	this.removeColor = function removeColor() {
		delete _properties.color;
		return this;
	};
	
	/* HEIGHT */
	/*
		@docs	http://www.mychannel-apps.de/documentation/KButton_setHeight
	*/
	this.getHeight = function getHeight() {
		return _properties.height;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KButton_setHeight
	*/
	this.setHeight = function setHeight(height) {
		_properties.height = height;
		return this;		
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KButton_removeHeight
	*/
	this.removeHeight = function removeHeight() {
		delete _properties.height;
		return this;
	};
	
	/* WIDTH */
	/*
		@docs	http://www.mychannel-apps.de/documentation/KButton_getWidth
	*/
	this.getWidth = function getWidth() {
		return _properties.width;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KButton_setWidth
	*/
	this.setWidth = function setWidth(width) {
		_properties.width = width;
		return this;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KButton_removeWidth
	*/
	this.removeWidth = function removeWidth() {
		delete _properties.width;
		return this;
	};
	
	/* SIZE */
	/*
		@docs	http://www.mychannel-apps.de/documentation/KButton_setSize
	*/
	this.setSize = function setSize(width, height) {
		this.setWidth(width);
		this.setHeight(height);
		return this;		
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KButton_removeSize
	*/
	this.removeSize = function removeSize() {
		this.removeWidth();
		this.removeHeight();
		return this;		
	};
	
	/* POSITION */
	/*
		@docs	http://www.mychannel-apps.de/documentation/KButton_getX
	*/
	this.getX = function getX() {
		return _properties.mx;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KButton_setX
	*/
	this.setX = function setX(x) {
		_properties.mx = x;
		return this;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KButton_getY
	*/
	this.getY = function getY() {
		return _properties.my;
		return this;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KButton_setY
	*/
	this.setY = function setY(y) {
		_properties.my = y;
		return this;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KButton_setPosition
	*/
	this.setPosition = function setPosition(x, y) {
		this.setX(x);
		this.setY(y);
		return this;
	};
	
	/* TEXTBORDER */
	/*
		@docs	http://www.mychannel-apps.de/documentation/KButton_useTextborder
	*/
	this.useTextborder = function useTextborder(bool) {
		if(bool) {
			_properties.textborder = '1';
		} else {
			delete _properties.textborder;
		}
		
		return this;
	};
	
	/* DISABLED */
	/*
		@docs	http://www.mychannel-apps.de/documentation/KButton_setEnabled
	*/
	this.setEnabled = function setEnabled(bool) {
		if(bool == false) {
			_properties.enabled = '0';
		} else {
			delete _properties.enabled;
		}
		return this;		
	};
	
	/* @ToDo TEXTCOLOR */
	/*
		@docs	http://www.mychannel-apps.de/documentation/KButton_toString
	*/
	this.toString = function toString() {
		var buffer = new StringBuffer('°>{button}');
		if(_text.length > 0) {
			buffer.append(_text + '|' + (_id > 0 ? _id : '') + '|');
		}
		
		if(_command.length > 0) {
			if(_fix_escaping) {
				buffer.append('call|' + _command.replace(/\|/g, '\\\\\\|'));
			} else {
				buffer.append('call|' + _command.replace(/\|/g, '\\\\\\\\\\|'));
			}
		}
		
		_properties.each(function(value, name) {
			buffer.append('|' + name + '|' + value);
		});
		
		buffer.append('<°');
		
		return buffer.toString();
	};
	
	// Call the Constructor
	KButton(text, command);
}