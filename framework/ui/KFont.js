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
	@docs		http://www.userapps.de/documentation/ui/font
*/

/*
	Example:
	var text = new KCode();
	text.append(new KFont("FinelinerScript", FontStyle.BOLD | FontStyle.ITALIC, 20));
	text.append("Deine neue Font..");
	Bot.public(text);
*/
var FontStyle = {
	/*
		@docs	http://www.userapps.de/documentation/FontStyle_PLAIN
	*/
	PLAIN:		0x00,
	
	/*
		@docs	http://www.userapps.de/documentation/FontStyle_BOLD
	*/
	BOLD:		0x01,
	
	/*
		@docs	http://www.userapps.de/documentation/FontStyle_ITALIC
	*/
	ITALIC:		0x02
};

/*
	@docs	http://www.userapps.de/documentation/KFont_constructor
*/
function KFont(name, style, size) {
	var _name		= 'Arial';
	var _size		= 14;
	var _style		= FontStyle.PLAIN;
	var _available	= [
		'Roboto-Bold',
		'Roboto-Light',
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
	
	/*
		@docs	http://www.userapps.de/documentation/KFont_toString
	*/
	this.toString = function toString() {
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


/**

Agency FB
Agency FB Bold
Arial
Arial Black
Arial Black Italic
Arial Bold
Arial Bold Italic
Arial Italic
Arial Narrow
Arial Narrow Bold
Arial Narrow Bold Italic
Arial Narrow Italic
Arial Rounded MT Bold
Arial-SM
Blackadder ITC
Bodoni MT
Bodoni MT Black
Bodoni MT Black Italic
Bodoni MT Bold
Bodoni MT Bold Italic
Bodoni MT Condensed
Bodoni MT Condensed Bold
Bodoni MT Condensed Bold Italic
Bodoni MT Condensed Italic
Bodoni MT Italic
Book Antiqua
Book Antiqua Bold
Book Antiqua Bold Italic
Book Antiqua Italic
Bookman Old Style
Bookman Old Style Bold
Bookman Old Style Bold Italic
Bookman Old Style Italic
Bookshelf Symbol 7
Bradley Hand ITC
Calisto MT
Calisto MT Bold
Calisto MT Bold Italic
Calisto MT Italic
Castellar
Century Gothic
Century Gothic Bold
Century Gothic Bold Italic
Century Gothic Italic
Century Schoolbook
Century Schoolbook Bold
Century Schoolbook Bold Italic
Century Schoolbook Italic
Comic Sans MS
Comic Sans MS Bold
Copperplate Gothic Bold
Copperplate Gothic Light
Courier New
Courier New Bold
Courier New Bold Italic
Courier New Italic
Curlz MT
Dialog.bold
Dialog.bolditalic
Dialog.italic
Dialog.plain
DialogInput.bold
DialogInput.bolditalic
DialogInput.italic
DialogInput.plain
Edwardian Script ITC
Elephant
Elephant Italic
Engravers MT
Eras Bold ITC
Eras Demi ITC
Eras Light ITC
Eras Medium ITC
Estrangelo Edessa
Felix Titling
Forte
Franklin Gothic Book
Franklin Gothic Book Italic
Franklin Gothic Demi
Franklin Gothic Demi Cond
Franklin Gothic Demi Italic
Franklin Gothic Heavy
Franklin Gothic Heavy Italic
Franklin Gothic Medium
Franklin Gothic Medium Cond
Franklin Gothic Medium Italic
French Script MT
Garamond
Garamond Bold
Garamond Italic
Gautami
Georgia
Georgia Bold
Georgia Bold Italic
Georgia Italic
Gigi
Gill Sans MT
Gill Sans MT Bold
Gill Sans MT Bold Italic
Gill Sans MT Condensed
Gill Sans MT Ext Condensed Bold
Gill Sans MT Italic
Gill Sans Ultra Bold
Gill Sans Ultra Bold Condensed
Gloucester MT Extra Condensed
Goudy Old Style
Goudy Old Style Bold
Goudy Old Style Italic
Goudy Stout
Haettenschweiler
Impact
Imprint MT Shadow
Kartika
Latha
Lucida Bright Demibold
Lucida Bright Demibold Italic
Lucida Bright Italic
Lucida Bright Regular
Lucida Console
Lucida Sans Demibold
Lucida Sans Demibold Italic
Lucida Sans Demibold Roman
Lucida Sans Italic
Lucida Sans Regular
Lucida Sans Typewriter Bold
Lucida Sans Typewriter Bold Oblique
Lucida Sans Typewriter Oblique
Lucida Sans Typewriter Regular
Lucida Sans Unicode
MS Outlook
MS Reference Sans Serif
MS Reference Specialty
MV Boli
Maiandra GD
Mangal
Marlett
Microsoft Sans Serif
Monospaced.bold
Monospaced.bolditalic
Monospaced.italic
Monospaced.plain
Monotype Corsiva
OCR A Extended
Palace Script MT
Palatino Linotype
Palatino Linotype Bold
Palatino Linotype Bold Italic
Palatino Linotype Italic
Papyrus
Perpetua
Perpetua Bold
Perpetua Bold Italic
Perpetua Italic
Perpetua Titling MT Bold
Perpetua Titling MT Light
Pristina
Raavi
Rage Italic
Rockwell
Rockwell Bold
Rockwell Bold Italic
Rockwell Condensed
Rockwell Condensed Bold
Rockwell Extra Bold
Rockwell Italic
SansSerif.bold
SansSerif.bolditalic
SansSerif.italic
SansSerif.plain
Script MT Bold
Serif.bold
Serif.bolditalic
Serif.italic
Serif.plain
Shruti
Sylfaen
Symbol
Tahoma
Tahoma Bold
Tera Special
Times New Roman
Times New Roman Bold
Times New Roman Bold Italic
Times New Roman Italic
Trebuchet MS
Trebuchet MS Bold
Trebuchet MS Bold Italic
Trebuchet MS Italic
Tunga
Tw Cen MT
Tw Cen MT Bold
Tw Cen MT Bold Italic
Tw Cen MT Condensed
Tw Cen MT Condensed Bold
Tw Cen MT Condensed Extra Bold
Tw Cen MT Italic
Verdana
Verdana Bold
Verdana Bold Italic
Verdana Italic
Vrinda
Webdings
Wingdings
Wingdings 2
Wingdings 3

*/