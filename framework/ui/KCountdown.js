/**
	The MIT License (MIT)

	Copyright (c) 2014 UserApps.de

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
	@docs	http://www.userapps.de/documentation/ui/countdown
*/

/*
	format=DE
	@docs	http://www.userapps.de/documentation/KCountdown_constructor
*/
function KCountdown() {
	this.javaClassName = 'KCountdown';	
	var _properties	= {};
	
	var timer = null;
	
	/*
		@docs	http://www.userapps.de/documentation/KCountdown_setTime
	*/
	this.setTime = function setTime(time) {
		_properties.time = time;
		return this;		
	};
	
	/*
		@docs	http://www.userapps.de/documentation/KCountdown_setFormat
	*/
	this.setFormat = function setFormat(format) {
		_properties.format = format;
		return this;		
	};
	
	this.setText = function setText(text) {
		_properties.timeUpText = text;
		return this;		
	};
	
	/*
		@docs	TODO
	*/
	this.setCallback = function setCallback(callback) {
		_properties.callback = callback;
		return this;		
	};
	
	/*
		@docs	http://www.userapps.de/documentation/KCountdown_toString
	*/
	this.toString = function toString() {
		var buffer = new StringBuffer('°>{countdown}');
		var index	= 0;
		var length	= _properties.size();
		
		_properties.each(function(value, name) {
			buffer.append(name + '=' + value);
			
			if(index + 1 < length) {
				buffer.append('|');
			}
			
			index++;
		});
		
		buffer.append('<°');
		
		if(isTypeOf(_properties.callback, 'function') && timer === null) {
			timer = setTimeout(_properties.callback, _properties.time);
		}
	
		return buffer.toString();
	};
}