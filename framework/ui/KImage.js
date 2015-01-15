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

/*
	Example:
	var image = new KImage('gt.gif');
	image.setPosition(100, -50);
	image.setLabel('Hallo Welt!');
	
	// with Link
	var link = new KLink(image);
	
	Bot.public(link);
*/
function KImage(image) {
	var _path		= '';
	var _name		= '';
	var _extension	= '';
	var _properties	= {};
	
	function KImage(image) {
		// @ToDo parse image with properties or HTTP Links!
		var split	= image.split('.');
		_name		= split[0];
		_extension	= split[1];
		var first	= _name.substring(0, 1);
		
		if(first == '/' || first == '~') {
			_name	= _name.substring(1);
			_path	= KnuddelsServer.getFullImagePath('');
		}
	}
	
	this.setContainerSize = function(width, height) {
		_properties.w = width;
		_properties.h = height;
	};
	
	this.setSize = function(width, height) {
		_properties.mw = width;
		_properties.mh = height;
	};
	
	this.setPosition = function(x, y) {
		_properties.mx = x;
		_properties.my = y;
	};
	
	this.setX = function(x) {
		_properties.mx = x;
	};
	
	this.setY = function(y) {
		_properties.my = y;
	};
	
	this.setLabel = function(text) {
		_properties.label = text;
	};
	
	this.setLabelPosition = function(x, y) {
		_properties.lmx = x;
		_properties.lmy = y;
	};
	
	this.setLabelColor = function(color) {
		_properties.labelcolor = color;
	};
	
	this.enableLabelBorder = function(bool) {
		_properties.labelborder = (bool == true ? '1' : '0');
	};
	
	this.setBorder = function(size) {
		_properties.border = size;
	};
	
	this.setQuadcut = function(size) {
		_properties.quadcut = size;
	};
	
	this.setShadow = function(position) {
		_properties.shadow = position;
	};
	
	this.setMirror = function(state) {
		_properties.mirror = (state == true ? 0x01 : 0x00);
	};
	
	this.setGreyscale = function(state) {
		_properties.gray = (state == true ? 0x01 : 0x00);
	};
	
	this.toString = function(only_path) {
		only_path	= only_path || false;
		var output	= (only_path == true ? '' : '°>') + _path + _name;
		
		if(_properties.size() > 0) {
			output += '..';
			
			_properties.each(function(value, name) {
				if(value == 0x00) {
					return;
				}
				
				output += '.' + name + (value == 0x01 ? '' : '_' + value);
			});
		}
				
		return output + '.' + _extension + (only_path == true ? '' : '<°');
	};
	
	KImage(image);
	
	/*
		grayDone
		mousew
		mouseh
		colorize
		colorizationcolor
		path
		ending
		cursor
		velocity
		imgfly
		bottomfade
	*/
}