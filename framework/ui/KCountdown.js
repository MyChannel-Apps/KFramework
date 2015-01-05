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
	format=DE
*/

function KCountdown() {
	var _properties	= {};
	
	this.setTime = function(time) {
		_properties.time = time;
	};
	
	this.setFormat = function(format) {
		_properties.format = format;
	};
	
	this.setText = function(text) {
		_properties.timeUpText = text;
	};
	
	this.toString = function() {
		var string	= '°>{countdown}';
		var index	= 0;
		
		for(var name in _properties) {
			string += name + '=' + _properties[name];
			
			if(index + 1 < Object.keys(_properties).length) {
				string += '|';
			}
			
			index++;
		}
		
		string += '<°';
		
		return string;
	};
}