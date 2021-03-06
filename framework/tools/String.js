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
	
	@author		Christoph Kühl <djchrisnet>
	@docs		http://www.userapps.de/documentation/tools/string
*/

/*
	@docs	http://www.userapps.de/documentation/String_urlencode
*/
if(!String.prototype.urlencode) {
	Object.defineProperty(String.prototype, 'urlencode', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value:			function urlencode() {
			return encodeURIComponent(this);
		}
	});
}

/*
	@docs	http://www.userapps.de/documentation/String_format
*/
if(!String.prototype.format) {
	Object.defineProperty(String.prototype, 'format', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value:			function format() {
			var args = arguments;
			return this.replace(/{(\d+)}/g, function(match, number) {
				return (typeof(args[number]) != 'undefined') ? args[number] : match;
			});
		}
	});
}

/*
	@docs	http://www.userapps.de/documentation/String_formater
*/
if(!String.prototype.formater) {
	Object.defineProperty(String.prototype, 'formater', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value:			function formater(data) {
			return this.replace(/\$[a-zA-Z0-9_\-]+/gi, function(match) {
				return (typeof(data[match.substring(1)]) != 'undefined') ? data[match.substring(1)] : match;
			});
		}
	});
}