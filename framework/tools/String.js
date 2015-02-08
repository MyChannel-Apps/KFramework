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
	
	@author		Christoph Kühl <djchrisnet>
	@docs		http://www.mychannel-apps.de/documentation/tools/string
*/

if(!String.prototype.urlencode) {
	Object.defineProperty(String.prototype, 'urlencode', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value:			function() {
			return encodeURIComponent(this);
		}
	});
}

/*
	@docs	http://www.mychannel-apps.de/documentation/String_format
*/
if(!String.prototype.format) {
	Object.defineProperty(String.prototype, 'format', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value:			function() {
			var args = arguments;
			return this.replace(/{(\d+)}/g, function(match, number) {
				return (typeof(args[number]) != 'undefined') ? args[number] : match;
			});
		}
	});
}


if(!String.prototype.formater) {
	Object.defineProperty(String.prototype, 'formater', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value:			function(data) {
			return this.replace(/\$[a-zA-Z]+/gi, function(match, number) {
				return (typeof(data[match.substring(1)]) != 'undefined') ? data[match.substring(1)] : match;
			});
		}
	});
}

/*
	@docs	http://www.mychannel-apps.de/documentation/String_contains
*/
if(!String.prototype.contains) {
	Object.defineProperty(String.prototype, 'contains', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value:			function(args) {
			if(typeof(args) == 'string') {
				args = [args];
			}
			
			for(var x in args) {
				if(this.indexOf(args[x])> -1) {
					return true;
				}
			}
			
			return false;
		}
	});
}