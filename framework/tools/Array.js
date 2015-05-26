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
	
	@author		Christoph Kühl <djchrisnet>, Adrian Preuß <Bizarrus>
	@docs		http://www.mychannel-apps.de/documentation/tools/array
*/

/*
	@docs	http://www.mychannel-apps.de/documentation/Array_each
*/
if(!Array.prototype.each) {
	Object.defineProperty(Array.prototype, 'each', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function(callback, reverse) {
			if(reverse == undefined) {
				reverse = false;
			}
			
			var result = true;
			
			if(reverse) {
				for(var index = this.length - 1; index >= 0; index--) {
					if(isTypeOf(this[index], 'object')) {
						if(callback.call(this, this[index], index) === false) {
							result = false;
							break;
						}
					} else if(callback.apply(this, [this[index], index]) === false) {
						result = false;
						break;
					}
				}
			} else {
				for(var index = 0; index < this.length; index++) {
					if(isTypeOf(this[index], 'object')) {
						if(callback.call(this, this[index], index) === false) {
							result = false;
							break;
						}
					} else if(callback.apply(this, [this[index], index]) === false) {
						result = false;
						break;
					}
				}
			}
			return result;
		}
	});
}

/*
	@docs	http://www.mychannel-apps.de/documentation/Array_random
*/
if(!Array.prototype.random) {
	Object.defineProperty(Array.prototype, 'random', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function() {
			var random = RandomOperations.nextInt(this.length);
			
			if(this.length <= 0 || random >= this.length) {
				return undefined;
			}
			return this[random];
		}
	});
}

if(!Array.prototype.shuffle) {
	Object.defineProperty(Array.prototype, 'shuffle', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function() {
			this.sort(function(a, b) {
				return (0.5 - Math.random());
			});
		}
	});
}

/*
	@docs	http://www.mychannel-apps.de/documentation/Array_exists
*/
if(!Array.prototype.exists) {
	Object.defineProperty(Array.prototype, 'exists', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function(value) {
			return (this.indexOf(value) > -1);
		}
	});
}

/*
	@docs	http://www.mychannel-apps.de/documentation/Array_size
*/
if(!Array.prototype.size) {
	Object.defineProperty(Array.prototype, 'size', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function() {
			return this.length;
		}
	});
}

/*
	@docs	TODO
*/
if(!Array.prototype.first) {
	Object.defineProperty(Array.prototype, 'first', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function() {
			return this[0];
		}
	});
}

/*
	@docs	TODO
*/
if(!Array.prototype.last) {
	Object.defineProperty(Array.prototype, 'last', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function() {
			return this[this.length - 1];
		}
	});
}

/*
	@docs	TODO
*/
if(!Array.prototype.clear) {
	Object.defineProperty(Array.prototype, 'clear', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function() {
			this.length = 0;
			return this;
		}
	});
}