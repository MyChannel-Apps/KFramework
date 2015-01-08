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

var KConfig = (new function() {
	var _data = DB.load('_config', {});
	var _defaults = {};
	var _puffer = {};
	var _useChangesPuffer = false;
	
	this.setDefaults = function(defaults) {
		_defaults = defaults;
		_data.compare(_defaults);
	};
	
	this.saveData = function() {
		//this.cleanData();
		DB.save('_config', _data);
	};
	
	this.resetData = function() {
		DB.save('_config', {});
		_data = {};
	};
	
	this.applyChanges = function() {
		_useChangesPuffer = true;
		
		_puffer.each(function(newvalue, key) {
			_data[key] = newvalue;
		});
		_puffer = {};
	};
	
	this.get = function(key) {
		if(key === undefined) {
			Logger.error('No key submitted');
			return undefined;
		}
		
		if(_data[key] === undefined) {
			Logger.error('Key "'+key+'" not exists');			
			return undefined;
		}
		
		return _data[key];
	};

	this.set = function(key, value) {
		if(key === undefined) {
			Logger.error('No key submitted');
			return false;
		}
		
		if(_data[key] === undefined) {
			Logger.error('Key "'+key+'" not exists');
			return false;
		}
		
		if(value === undefined) {
			value = _defaults[key];
		}
		
		var error;
		if(!(error = this.check(key, value))) {
			return error;
		}
		
		if(_useChangesPuffer) {
			_puffer[key] = value;
		} else {
			_data[key] = value;
		}
	};
	
	this.check = function() {
		return true;
	};
		
}());