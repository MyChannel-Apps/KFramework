/**
	The MIT License (MIT)

	Copyright (c) 2015 UserApps.de

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
	@docs		http://www.userapps.de/documentation/ui/tooltip
*/

var KCODE_TOOLTIPS_INSTANCES = 0;

/*
	@docs		http://www.userapps.de/documentation/KTooltip_constructor
*/
function KTooltip(content) 	{
	this.javaClassName = 'KTooltip';	
	var _content		= new KCode();
	var _instance		= 0;
	var _hover_disabled	= false;
	var _width			= 100;
	var _height			= 100;
	
	function KTooltip(content) {
		if(content != undefined) {
			_content.append(content);
		}
		
		_instance	= KCODE_TOOLTIPS_INSTANCES++;
	};
	
	/*
		@docs		http://www.userapps.de/documentation/KTooltip_setSize
	*/
	this.setSize = function setSize(width, height) {
		_width	= width;
		_height	= height;
		return this;
	};
	
	/*
		@docs		http://www.userapps.de/documentation/KTooltip_setWidth
	*/
	this.setWidth = function setWidth(width) {
		_width	= width;
		return this;
	};
	
	/*
		@docs		http://www.userapps.de/documentation/KTooltip_setHeight
	*/
	this.setHeight = function setHeight(height) {
		_height	= height;
		return this;
	};
	
	/*
		@docs		http://www.userapps.de/documentation/KTooltip_append
	*/
	this.append = function append(content) {
		_content.append(content);
		return this;
	};
	
	/*
		@docs		http://www.userapps.de/documentation/KTooltip_newLine
	*/
	this.newLine = function newLine() {
		_content.newLine();
		return this;
	};
	
	this.disableHover = function disableHover(state) {
		_hover_disabled = state;
	};
	
	/*
		@docs		http://www.userapps.de/documentation/KTooltip_getCommand
	*/
	this.getCommand = function getCommand(text, command) {
		if(!(text instanceof KLink)) {
			text = new KLink(text);
			
			if(_hover_disabled) {
				text.setCommand((command == undefined ? '' : '/doubleaction ' + command + '|') + '/openpulldown id_' + _instance + '.w_' + _width + '.h_' + _height);
			} else {
				text.setCommand((command == undefined ? '/void' : command) + '{{onEnter=/openpulldown id_' + _instance + '.w_' + _width + '.h_' + _height + '}}{{onExit=/closepulldown id_' + _instance + '}}');
			}
		}
		
		return text;
	};
	
	/*
		@docs		http://www.userapps.de/documentation/KTooltip_
	*/
	this.toString = function toString() {
		var output = new KCode();
		
		output.append('°>{definetext|').append(_instance).append('}<°').append(_content).append('°>{definetext|').append(_instance).append('}<°');

		return output;
	};
	
	KTooltip(content);
};