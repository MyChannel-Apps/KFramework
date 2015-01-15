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

require('framework/ui/KButton.js');
require('framework/ui/KLink.js');
require('framework/ui/KCountdown.js');
require('framework/ui/KFont.js');
require('framework/ui/KImage.js');
require('framework/ui/KColor.js');
require('framework/ui/KTable.js');

function KCode() {
	var _buffer = [];
	var _debug	= false;
	var _minify	= true;
	
	this.append = function(component) {
		_buffer.push(component);
	};
	
	this.newLine = function() {
		_buffer.push('°#°');
		
		// DEPRECATED!
		_buffer.push('#');
	};
	
	this.newHr = function() {
		_buffer.push('°-°');
	};
	
	this.setAlignment = function(alignment) {
		_buffer.push(alignment);
	};	
	
	this.addImage = function(file) {
		Logger.info('KCode.addImage(file) is DEPRECATED');
		// @ToDo to Image-Object with addition options (margin, hover, what ever)
		_buffer.push('°>' + KnuddelsServer.getFullImagePath(file) + '<°');
	};
	
	this.toString = function() {
		var string = '';
		
		_buffer.each(function(component) {
			if(typeof(component) == 'string' || typeof(component) == 'number') {
				string		+= component;
			} else if(component != undefined && component != null) {
				string		+= component.toString();
			}
		});
		
		if(_debug) {
			string = string.replace(/°/g, '\\°');
		}
		
		if(_minify) {
			string = string.replace(/°°/g, '');
		}
		
		return string;
	};
};