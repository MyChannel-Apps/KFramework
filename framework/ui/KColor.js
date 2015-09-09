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
	@docs	http://www.mychannel-apps.de/documentation/ui/color
*/

var Colors = {
	/*
		@docs	http://www.mychannel-apps.de/documentation/Color_CHANNEL_RED
	*/
	CHANNEL_RED:	new ColorInstance('RR', [-255, 0, 0]),
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Color_CHANNEL_BLUE
	*/
	CHANNEL_BLUE:	new ColorInstance('BB', [0, 0, -255]),
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Color_WHITE
	*/
	WHITE:			new ColorInstance('W', [255, 255, 255]),
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Color_BLACK
	*/
	BLACK:			new ColorInstance('K', [0, 0, 0]),
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Color_GRAY
	*/
	GRAY:			new ColorInstance('A', [128, 128, 128]),
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Color_LIGHT_GREY
	*/
	LIGHT_GREY:		new ColorInstance('L', [192, 192, 192]),
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Color_DARK_GREY
	*/
	DARK_GREY:		new ColorInstance('D', [64, 64, 64]),
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Color_RED
	*/
	RED:			new ColorInstance('R', [255, 0, 0]),
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Color_BLUE
	*/
	BLUE:			new ColorInstance('B', [0, 0, 255]),
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Color_GREEN
	*/
	GREEN:			new ColorInstance('G', [0, 255, 0]),
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Color_DARK_GREEN
	*/
	DARK_GREEN:		new ColorInstance('E', [0, 172, 0]),
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Color_YELLOW
	*/
	YELLOW:			new ColorInstance('Y', [255, 255, 0]),
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Color_CYAN
	*/
	CYAN:			new ColorInstance('C', [0, 255, 255]),
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Color_MAGENTA
	*/
	MAGENTA:		new ColorInstance('M', [255, 0, 255]),
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Color_PINK
	*/
	PINK:			new ColorInstance('P', [255, 175, 175]),
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Color_ORANGE
	*/
	ORANGE:			new ColorInstance('O', [255, 200, 0]),
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Color_BROWN
	*/
	BROWN:			new ColorInstance('N', [150, 74, 0]),
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Color_decode
	*/
	decode:			function(hex) {
		var color = new KColor();
		color.decode(hex);
		return color;
	}
};

/*
	@docs	http://www.mychannel-apps.de/documentation/KColor_constructor
*/
function KColor(red, green, blue) {
	var _red	= -1;
	var _green	= -1;
	var _blue	= -1;
	
	function KColor(instance, red, green, blue) {
		// If only the first argument is set
		if(red != undefined && green == undefined && blue == undefined) {
			
			// First argument is HEX
			if(isHex(red)) {
				instance.decode(red);
				return;
				
			// First argument is RGB
			} else if(isRGB(red)) {
				var split	= red.split(',');
				_red		= parseInt(split[0], 10);
				_green		= parseInt(split[1], 10);
				_blue		= parseInt(split[2], 10);
				return;
			}
		}
		
		_red	= red;
		_green	= green;
		_blue	= blue;
	};
	
	function isHex(input) {
		return (input.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i));
	};
	
	function isRGB(input) {
		return (input.match(/^([\d]{1,3}),([\d]{1,3}),([\d]{1,3})$/i));
	};
	
	function isConstant() {
		for(var name in Colors) {
			if(name == 'decode') {
				continue;
			}
			
			var _color_instance = Colors[name];
			
			if(_color_instance != undefined) {
				if(_color_instance.getRed() == _red && _color_instance.getGreen() == _green && _color_instance.getBlue() == _blue) {
					return true;
				}
			}
		}
		
		return false;
	};
	
	function getConstant() {
		for(var name in Colors) {
			if(name == 'decode') {
				continue;
			}
			
			var _color_instance = Colors[name];
			
			if(_color_instance.getRed() == _red && _color_instance.getGreen() == _green && _color_instance.getBlue() == _blue) {
				return _color_instance;
			}
		}
		
		return '';
	};
	
	this.getRGB = function getRGB() {
		var buffer = new StringBuffer();
		
		buffer.append(_red).append(',').append(_green).append(',').append(_blue);
		
		return buffer.toString();
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KColor_decode
	*/
	this.decode = function decode(hex) {
		var result	= /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		_red		= parseInt(result[1], 16);
		_green		= parseInt(result[2], 16);
		_blue		= parseInt(result[3], 16);
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KColor_toString
	*/
	this.toString = function toString() {
		var output = new KCode();
		
		// If RGB sounds like Color-Constants (°R°, °B°,..)
		if(isConstant()) {
			output.append(getConstant());
		} else {
			output.append('°[').append(_red).append(',').append(_green).append(',').append(_blue).append(']°');
		}
		
		return output;
	};
	
	KColor(this, red, green, blue);
};

/*
	@docs	http://www.mychannel-apps.de/documentation/ColorInstance_constructor
*/
function ColorInstance(key, rgb) {
	/*
		@docs	http://www.mychannel-apps.de/documentation/ColorInstance_getColorKey
	*/
	this.getColorKey = function getColorKey() {
		return key;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/ColorInstance_getRGB
	*/
	this.getRGB = function getRGB() {
		return rgb;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/ColorInstance_getRed
	*/
	this.getRed = function getRed() {
		return rgb[0];
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/ColorInstance_getGreen
	*/
	this.getGreen = function getGreen() {
		return rgb[1];
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/ColorInstance_getBlue
	*/
	this.getBlue = function getBlue() {
		return rgb[2];
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/ColorInstance_toString
	*/
	this.toString = function toString() {
		var output = new KCode();
		
		output.append('°').append(key).append('°');
		
		return output;
	};
}