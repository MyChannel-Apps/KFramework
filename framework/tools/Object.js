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
*/

if(!Object.prototype.each) {
	Object.defineProperty(Object.prototype, 'each', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value:			function(callback) {
			for(var index in this) {
				if(!this.hasOwnProperty(index)) {
					continue;
				}
				
				if(typeof(this[index]) == 'object') {
					if(callback.call(this, this[index], index) === false) {
						break;
					}
				} else if(callback.apply(this, [this[index], index]) === false) {
					break;
				}
			}
		}
	});
}

if(!Object.prototype.sort) {
	Object.defineProperty(Object.prototype, 'sort', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value:			function(byKey, order) {
			if(byKey === undefined) {
				byKey == 'index';
			}

			if(order === undefined) {
				order == 'ASC'; // Highest value
			}

			var keys = [];
			for(var index in this) {
				var sortby = 0;
				
				if(byKey == 'index') {		
					sortby = index;
				} else if(byKey == 'value') {		
					sortby = this[index];
				} else if(this[index].hasOwnProperty(byKey)) {
					sortby = this[index][byKey];
				}
			
				keys.push({
					index:	index,
					value:	this[index],
					sortby:	sortBy
				});
			}

			if(order == 'ASC') {
				keys.sort(function(a, b) {
					return a.sortby - b.sortby;
				});
			} else {
				keys.sort(function(a, b) {
					return b.sortby - a.sortby;
				});
			}


			var newObj = {};
			for(var k in keys) {
				newObj[keys[k].index] = this[keys[k].index];
				delete this[keys[k].index];
			}

			for(var key in newObj) {
				this[key] = newObj[key];
			}
			
			return newObj;
		}
	});
}

if(!Object.prototype.exists) {
	Object.defineProperty(Object.prototype, 'exists', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value:			function(value) {
			return (this[value] != undefined);
		}
	});
}

if(!Object.prototype.compare) {
  Object.defineProperty(Object.prototype, 'compare', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function(defaultObj) {
		for(var property in defaultObj) {
			if(this[property] && (typeof(this[property]) == 'object') && (this[property].toString() == '[object Object]') && defaultObj[property]) {
				this[property].compare(defaultObj[property]);
			} else if(typeof this[property] == 'undefined') {
				this[property] = defaultObj[property];
			}
		}
		return this;
    }
  });
}

if(!Object.prototype.size) {
	Object.defineProperty(Object.prototype, 'size', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value:			function() {
			return Object.keys(this).length;
		}
	});
}