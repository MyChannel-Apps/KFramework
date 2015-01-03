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

function KLink(text) {
	var _text			= '';
	var _command_left	= undefined;
	var _command_right	= undefined;
	var _hover			= true;
	
	function KLink(text) {
		_text = text || '';
	}
	
	function prepareLink(string) {
		return string.replace(/(<|>|\||°)/g, '\\$1');
	}
	
	this.setCommand = function(command_left, command_right) {
		_command_left	= command_left;
		_command_right	= command_right;
	};
	
	this.enableHover = function(state) {
		_hover = state;
	};

	this.toString = function() {
		var string = '°>';
		
		if(_text instanceof KImage) {
			string += _text.toString(true);
			
			// @ToDo The Hover
			string += '|' + _text.toString(true) + '<>--<>';
		} else {
			if(_hover == false) {
				string += '_h';
			}
			
			string += prepareLink(_text);
		}
		
		if(_command_left != undefined) {
			string += '|' + _command_left;
		}
		
		if(_command_right != undefined) {
			string += '|' + _command_right;
		}
		
		string += '<°';
		return string;
	};
	
	KLink(text);
};