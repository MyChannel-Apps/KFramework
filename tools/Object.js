if (!Object.prototype.each) {
  Object.defineProperty(Object.prototype, 'each', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function(callback) {
		for (index in this) {
			if(this.hasOwnProperty(index)) {
				continue;
			}
			if (callback.apply(this[index], index) === false) {
				break;
			}
		}
    }
  });
}

if (!Object.prototype.sort) {
  Object.defineProperty(Object.prototype, 'sort', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function(byKey, order) {
		
		if(byKey === undefined) {
			byKey == 'index';
		}
		
		if(order === undefined) {
			order == 'ASC'; // Highest value
		}		
			
		keys = [];
		for(var index in this) {
			sortby = 0;
			if(byKey == 'index') {		
				sortby = index;
			} else if(byKey == 'value') {		
				sortby = this[index];
			} else if(this[index].hasOwnProperty(byKey)) {
				sortby = this[index][byKey];
			}
			keys.push({index: index, value: this[index], sortby: sortBy});
		}	
		
		if(order == 'ASC') {
			keys.sort(function(a, b) { return a.sortby - b.sortby; });
		} else {
			keys.sort(function(a, b) { return b.sortby - a.sortby; });
		}
		
		
		newObj = {};
		for (var k in keys) {
			newObj[keys[k].index] = this[keys[k].index];
			delete this[keys[k].index];
		}

		for (var key in newObj) {
			this[key] = newObj[key];
		}
		return newObj;
    }
  });
}