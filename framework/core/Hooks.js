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
	
	@author		Adrian Preuß <Bizarrus>, Christoph Kühl <djchrisnet>
*/

var Hooks = (new function() {
	var _hooks	= {};
	var _debug	= false;
	
	this.add = function(name, callback, priority) {
		priority = (priority == undefined ? 10 : priority); // default Priority is 10
		
		if(_hooks[priority] == undefined) {
			_hooks[priority] = [];
		}
		
		if(_hooks) {
			Logger.info('[Hooks] Adding "' + name + '" with Priority of ' + priority);
		}
		
		_hooks[priority].push({
			name:		name,
			callback:	callback
		});
	};
	
	this.remove = function(name, priority) {
		priority = (priority == undefined ? 10 : priority); // default Priority is 10
		
		if(_hooks) {
			Logger.info('[Hooks] Removing "' + name + '" with Priority of ' + priority);
		}
		
		_hooks[priority].each(function(hook, index) {
			if(hook.name == name) {
				delete _hooks[priority][index];
			}
		});
	};
	
	this.do = function(name) {
		var args		= [];
		var args_length	= arguments.size();
		for(var index = 0; index < args_length; ++index) {
			var argument = arguments[index];
			
			if(argument == undefined || argument == null) {
				continue;
			}
			
			args.push(argument);
		}
		args.shift(); // remove the first argument
		
		if(_hooks) {
			Logger.info('[Hooks] Execute "' + name + '" with params: ' + JSON.stringify(args));
		}
		
		// sort by priority
		_hooks.sort('index', 'ASC');
		
		_hooks.each(function(hooks, priority) {
			if(_hooks) {
				Logger.info('[Hooks] Each: PRIORITY ' + priority);
			}
			
			hooks.each(function(hook) {
				if(hook.name == name) {
					hook.callback.apply(this, args);
				}
			});
		});
	};
}());