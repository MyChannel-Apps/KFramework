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
	@docs		http://www.mychannel-apps.de/documentation/ui/tooltip
*/

var KCODE_TOOLTIPS_INSTANCES = 0;

/*
	@docs		http://www.mychannel-apps.de/documentation/KTooltip_constructor
*/
function KTooltip(content) 	{
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
	
	/*
		@docs		http://www.mychannel-apps.de/documentation/KTooltip_setSize
	*/
	this.setSize = function(width, height) {
		_width	= width;
		_height	= height;
		return this;
	};
	
	/*
		@docs		http://www.mychannel-apps.de/documentation/KTooltip_setWidth
	*/
	this.setWidth = function(width) {
		_width	= width;
		return this;
	};
	
	/*
		@docs		http://www.mychannel-apps.de/documentation/KTooltip_setHeight
	*/
	this.setHeight = function(height) {
		_height	= height;
		return this;
	};
	
	/*
		@docs		http://www.mychannel-apps.de/documentation/KTooltip_append
	*/
	this.append = function(content) {
		_content.append(content);
		return this;
	};
	
	/*
		@docs		http://www.mychannel-apps.de/documentation/KTooltip_newLine
	*/
	this.newLine = function() {
		_content.newLine();
		return this;
	};
	
	/*
		@docs		http://www.mychannel-apps.de/documentation/KTooltip_getCommand
	*/
	this.getCommand = function(text) {
		if(!(text instanceof KLink)) {
			text = new KLink(text);
			text.setCommand('/openpulldown id_' + _instance + '.w_' + _width + '.h_' + _height);
		}
		
		return text;
	};
	
	/*
		@docs		http://www.mychannel-apps.de/documentation/KTooltip_
	*/
	this.toString = function() {
		var output = new KCode();
		
		output.append('°>{definetext|').append(_instance).append('}<°').append(_content).append('°>{definetext|').append(_instance).append('}<°');

		return output;
	};
	
	KTooltip(content);
};