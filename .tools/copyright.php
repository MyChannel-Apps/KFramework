<?php
	function replacer($string) {
		return str_replace(array(
			'EOF();',
			'this.MINIFIERdelete',
			'this.MINIFIERpublic',
			'this.MINIFIERprivate',
			'Bot.MINIFIERpublic',
			'Bot.MINIFIERprivate',
			'this.MINIFIERdo'
		), array(
			PHP_EOL . PHP_EOL,
			'this.delete',
			'this.public',
			'this.private',
			'Bot.public',
			'Bot.private',
			'this.do'
		), $string);
	}
	
	$path 		= dirname(__DIR__) . '/framework/';
	$copyright	= '/**
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
	
	@author		Adrian Preuß <Bizarrus>, Christoph Kühl <djchrisnet>
	@docs		http://www.mychannel-apps.de/documentation/
*/';
	
	file_put_contents($path . 'KFramework.min.js', $copyright . PHP_EOL . PHP_EOL . replacer(file_get_contents($path . 'KFramework.min.js')));
	printf('Compressed to: %d bytes', number_format(filesize($path . 'KFramework.min.js')));
	print(PHP_EOL);
	print(PHP_EOL);
?>