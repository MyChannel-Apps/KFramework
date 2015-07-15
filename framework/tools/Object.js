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
	@docs		http://www.mychannel-apps.de/documentation/
*/

/*
	@docs	http://www.mychannel-apps.de/documentation/Object_each
*/
if(!Object.prototype.each) {
	Object.defineProperty(Object.prototype, 'each', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function each(callback, reverse) {
			if(reverse == undefined) {
				reverse = false;
			}
			
			var result = true;
			
			if(reverse) {
				var keys = [];
				for(var index in this) {
					keys.push(index);
				}
				
				for(var key_index = keys.length - 1; key_index >= 0; key_index--) {
					var index = keys[key_index];
					
					if(!this.hasOwnProperty(index)) {
						continue;
					}
					
					if(typeof(this[index]) == 'object') {
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
				for(var index in this) {
					if(!this.hasOwnProperty(index)) {
						continue;
					}
					
					if(typeof(this[index]) == 'object') {
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
	@docs	http://www.mychannel-apps.de/documentation/Object_sort
*/
if(!Object.prototype.sort) {
	Object.defineProperty(Object.prototype, 'sort', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function sort(byKey, order) {
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
					sortby:	sortby
				});
			}
	
			if(order == 'ASC') {
				keys.sort(function(a, b) {
					if(a.sortby < b.sortby) return -1;
					if(a.sortby > b.sortby) return 1;
					return 0;
				});
			} else {
				keys.sort(function(b, a) {
					if(a.sortby < b.sortby) return -1;
					if(a.sortby > b.sortby) return 1;
					return 0;
				});
			}
	
	
			var newObj = {};
			for(var k in keys) {
				if(keys[k] != undefined) {
					newObj[keys[k].index] = this[keys[k].index];
				}
				
				delete this[keys[k].index];
			}
	
			for(var key in newObj) {
				this[key] = newObj[key];
			}
			
			return newObj;
		}
	});
}

/*
	@docs	http://www.mychannel-apps.de/documentation/Object_exists
*/
if(!Object.prototype.exists) {
	Object.defineProperty(Object.prototype, 'exists', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function exists(value) {
			return (this[value] != undefined);
		}
	});
}

/*
	@docs	http://www.mychannel-apps.de/documentation/Object_compare
*/
if(!Object.prototype.compare) {
	Object.defineProperty(Object.prototype, 'compare', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function compare(defaultObj) {
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

/*
	@docs	http://www.mychannel-apps.de/documentation/Object_size
*/
if(!Object.prototype.size) {
	Object.defineProperty(Object.prototype, 'size', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function size() {
			return Object.keys(this).length;
		}
	});
}

if(!Object.prototype.random) {
	Object.defineProperty(Object.prototype, 'random', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function random() {
			var keys	= Object.keys(this);
			
			if(keys.length <= 0) {
				return undefined;
			}
			
			var random	= RandomOperations.nextInt(keys.length);
			
			if(keys.length <= 0 || random >= keys.length) {
				return undefined;
			}
			
			return this[keys[random]];
		}
	});
}