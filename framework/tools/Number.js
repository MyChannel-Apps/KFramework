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
	
	@author		Christoph Kühl <djchrisnet>, Adrian Preuß <Bizarrus>
	@docs		http://www.userapps.de/documentation/tools/number
*/


/*
	@docs	TODO
*/
if(!Number.prototype.fix) {
	Object.defineProperty(Number.prototype, 'fix', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function fix(count) {
			return parseFloat(this.toFixed(parseInt(count, 10) || 2));
		}
	});
}

/*
	@docs	TODO
*/
if(!Number.prototype.format) {
	Object.defineProperty(Number.prototype, 'format', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function format(n, x, fill) {
			if(n === undefined) { n = 2; }
			if(x === undefined) { x = 3; }
			if(fill === undefined) { fill = '.'; }
			return this.toFixed(Math.max(0, Math.floor(n))).replace(new RegExp('\\d(?=(\\d{'+x+'})+' + (n > 0 ? '\\.' : '$') + ')', 'g'), '$&'+fill);
		}
	});
}

/*
	@docs	TODO
*/
if(!Number.prototype.zero) {
  Object.defineProperty(Number.prototype, 'zero', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function zero() {
		return (this>=10) ? ''+this : '0'+this;
    }
  });
}