/**
	The MIT License (MIT)

	Copyright (c) 2015 MyChannel-Apps.de

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
	@docs	http://www.mychannel-apps.de/documentation/kcode/button
*/

var KCODE_TOOLTIPS_INSTANCES = 0;

function KTooltip(content) {
	var _content	= new KCode();
	var _instance	= 0;
	var _width		= 100;
	var _height		= 100;
	
	function KTooltip(content) {
		if(content != undefined) {
			_content.append(content);
		}
		
		_instance	= KCODE_TOOLTIPS_INSTANCES++;
	};
	
	this.setSize = function(width, height) {
		_width	= width;
		_height	= height;
	};
	
	this.setWidth = function(width) {
		_width	= width;
	};
		
	this.setHeight = function(height) {
		_height	= height;
	};
	
	this.append = function(content) {
		_content.append(content);
	};
	
	this.newLine = function() {
		_content.newLine();
	};
	
	this.getCommand = function(text) {
		if(!(text instanceof KLink)) {
			text = new KLink(text);
			text.setCommand('/openpulldown id_' + _instance + '.w_' + _width + '.h_' + _height);
		}
		
		return text
	};
	
	this.toString = function() {
		var output = new KCode();
		
		output.append('°>{definetext|');
		output.append(_instance);
		output.append('}<°');
		output.append(_content);
		output.append('°>{definetext|');
		output.append(_instance);
		output.append('}<°');
		
		return output;
	};
	
	KTooltip(content);
};