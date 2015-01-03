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
	var text = new KCode();
	text.append(new KFont("FinelinerScript", FontStyle.BOLD | FontStyle.ITALIC, 20));
	text.append("Deine neue Font..");
	Bot.public(text);
*/

var FontStyle = {
	PLAIN:		0x00,
	BOLD:		0x01,
	ITALIC:		0x02
};

function KFont(name, style, size) {
	var _name		= 'Arial';
	var _size		= 14;
	var _style		= FontStyle.PLAIN;
	var _available	= [
		'RobotoBold',
		'RobotoLight',
		'FinelinerScript',
		'Arial',
		'Impact'
		/* @ToDo add more System fonts! */
	];
	
	function KFont(name, style, size) {
		_name	= name;
		_size	= size;
		_style	= style;
	}
	
	this.toString = function() {
		var output = '';
		
		if(_style & FontStyle.BOLD) {
			output += '_';
		}
		
		if(_style & FontStyle.ITALIC) {
			output += '"';
		}
		
		output += '°';
		
		if(_available.indexOf(_name) > -1) {
			output += '>{font}' + _name + '<';
		} else {
			Logger.info('Font ' + _name + ' does\'nt exists!');
		}
		
		output += _size + '°';
		
		return output;
	};
	
	KFont(name, style, size);
}
