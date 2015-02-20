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
	@docs	http://www.mychannel-apps.de/documentation/kcode/link
*/

/*
	@docs	http://www.mychannel-apps.de/documentation/KLink_constructor
*/
function KLink(text, command_left, command_right) {
	var _text			= '';
	var _command_left	= undefined;
	var _command_right	= undefined;
	var _hover			= true;
	var _hover_image	= undefined;
	
	function KLink(text, command_left, command_right) {
		_text			= text || '';
		_command_left	= command_left;
		_command_right	= command_right;
	}
	
	function prepareLink(string) {
		return string.replace(/(<|>|\||°)/g, '\\$1');
	}
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KLink_setCommand
	*/
	this.setCommand = function(command_left, command_right) {
		_command_left	= command_left;
		_command_right	= command_right;
		return this;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KLink_enableHover
	*/
	this.enableHover = function(state) {
		_hover = state;
		return this;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KLink_setHoverImage
	*/
	this.setHoverImage = function(image) {
		if(_text instanceof KImage) {
			_hover_image = image;
		} else {
			Logger.warn('You can only use KImage.setHoverImage(image) when you bind a KImage!');
		}
		
		return this;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KLink_toString
	*/
	this.toString = function() {
		var buffer = new StringBuffer('°>');
		
		if(_text instanceof KImage) {
			if(_hover == false) {
				_text.noPush(true);
				_hover_image.noPush(true);
			}
			
			buffer.append(_text.toString(true));
			
			if(_hover_image != undefined) {
				buffer.append('|' + _hover_image.toString(true));
			}
			
			buffer.append('<>--<>');
		} else {
			if(_hover == false) {
				buffer.append('_h');
			}
			
			buffer.append(prepareLink(_text));
		}
		
		if(_command_left != undefined) {
			buffer.append('|' + _command_left.replace(/\|/g, '\\\\\\\\\\|'));
		}
		
		if(_command_right != undefined) {
			buffer.append('|' + _command_right.replace(/\|/g, '\\\\\\\\\\|'));
		}
		
		buffer.append('<°');
		return buffer.toString();
	};
	
	KLink(text, command_left, command_right);
};