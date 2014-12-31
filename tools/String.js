if (!String.prototype.startsWith) {
  Object.defineProperty(String.prototype, 'startsWith', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function(searchString, position) {
      position = position || 0;
      return this.lastIndexOf(searchString, position) === position;
    }
  });
}

if (!String.prototype.endsWith) {
  Object.defineProperty(String.prototype, 'endsWith', {
    value: function(searchString, position) {
      subjectString = this.toString();
      if(position === undefined || position > subjectString.length) {
      	position = subjectString.length;
      }
      position -= searchString.length;
      lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
    }
  });
}

if (!String.prototype.format) {
  Object.defineProperty(String.prototype, 'format', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function() {
	  var args = arguments;
      return this.replace(/{(\d+)}/g, function(match, number) {
	  	return (typeof args[number] != 'undefined') ? args[number] : match;
	  });
    }
  });
}

if (!String.prototype.contains) {
  Object.defineProperty(String.prototype, 'contains', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function(args) {
	  if(typeof args == 'string') {
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