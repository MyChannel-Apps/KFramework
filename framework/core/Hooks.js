/**
	The MIT License (MIT)

	Copyright (c) 2015 MyChannel-Apps.de

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
	
	@author		Adrian Preuß <Bizarrus>
	@docs		http://www.mychannel-apps.de/documentation/core/hooks
*/

var Hooks = (new function Hooks() {
	var _hooks	= {};
	var _debug	= false;
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Hooks_addFilter
	*/
	this.addFilter = function addFilter(name, callback, priority) {
		this.add(name, callback, priority, true);
		return this;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Hooks_addAction
	*/
	this.addAction = function addAction(name, callback, priority) {
		this.add(name, callback, priority);
		return this;		
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Hooks_add
	*/
	this.add = function add(name, callback, priority, is_filter) {
		priority	= (priority == undefined ? 10 : priority); // default Priority is 10
		is_filter	= (is_filter == undefined ? false : is_filter);
		
		if(_hooks[priority] == undefined) {
			_hooks[priority] = [];
		}
		
		if(_debug) {
			if(Logger == undefined) {
				KnuddelsServer.getDefaultLogger().info('[Hooks] Adding "' + name + '" with Priority of ' + priority);
			} else {
				Logger.info('[Hooks] Adding "' + name + '" with Priority of ' + priority);
			}
		}
		
		_hooks[priority].push({
			name:		name,
			callback:	callback,
			is_filter:	is_filter
		});
		return this;		
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Hooks_remove
	*/
	this.remove = function remove(name, priority) {
		priority = (priority == undefined ? 10 : priority); // default Priority is 10
		
		if(_debug) {
			if(Logger == undefined) {
				KnuddelsServer.getDefaultLogger().info('[Hooks] Removing "' + name + '" with Priority of ' + priority);
			} else {
				Logger.info('[Hooks] Removing "' + name + '" with Priority of ' + priority);
			}
		}
		
		if(!Object.prototype.each) {
			for(var index in _hooks[priority]) {
				var hook = _hooks[priority][index];
				
				if(hook.name == name) {
					delete _hooks[priority][index];
				}
			}
		} else {
			_hooks[priority].each(function HooksPriorityEach(hook, index) {
				if(hook.name == name) {
					delete _hooks[priority][index];
				}
			});
		}
		return this;		
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Hooks_applyFilter
	*/
	this.applyFilter = function applyFilter(name) {
		var args		= [];
		var args_length	= arguments.size();
		
		for(var index = 0; index < args_length; ++index) {
			var argument = arguments[index];
			
			if(argument == undefined || argument == null) {
				continue;
			}
			
			args.push(argument);
		}
		
		args.splice(1, 0, true);
		
		return this.do.apply(this, args);
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Hooks_do
	*/
	this.do = function Do(name, is_filter) {
		if(_debug) {
			if(Logger == undefined) {
				KnuddelsServer.getDefaultLogger().info('[Hooks] ' + JSON.stringify(arguments));
			} else {
				Logger.info('[Hooks] ' + JSON.stringify(arguments));
			}
		}
		
		var is_filter_set	= (is_filter == undefined || typeof(is_filter) != 'boolean');
		var args			= [];
		var args_length		= arguments.size();
		var output			= undefined;
		
		for(var index = 0; index < args_length; ++index) {
			var argument = arguments[index];
			
			if(argument == undefined || argument == null) {
				continue;
			}
			
			args.push(argument);
		}
		
		// remove the arguments
		args.shift();
		
		if(!is_filter_set) {
			args.shift();
		}
		
		output			= args[0];
		
		if(_debug) {
			if(Logger == undefined) {
				KnuddelsServer.getDefaultLogger().info('[Hooks] Execute "' + name + '" with params: ' + JSON.stringify(args));
			} else {
				Logger.info('[Hooks] Execute "' + name + '" with params: ' + JSON.stringify(args));
			}
		}
		
		// sort by priority
		if(!Array.prototype.sort) {
			if(Logger == undefined) {
				KnuddelsServer.getDefaultLogger().warn('Hooks won\'t sort by Priority because Array.sort(); is not available. Please import framework/tools/Array.js!');
			} else {
				Logger.warn('Hooks won\'t sort by Priority because Array.sort(); is not available. Please import framework/tools/Array.js!');
			}
		} else {
			_hooks.sort('index', 'ASC');
		}
		
		if(!Object.prototype.each) {
			for(var priority in _hooks) {
				var hooks = _hooks[priority];
				
				if(_debug) {
					if(Logger == undefined) {
						KnuddelsServer.getDefaultLogger().info('[Hooks] Each: PRIORITY ' + priority);
					} else {
						Logger.info('[Hooks] Each: PRIORITY ' + priority);
					}
				}
				
				for(var index in hooks) {
					var hook = hooks[index];
					
					if(hook.name == name) {
						if(typeof(output) != 'array') {
							output = [ output ];
						}
						
						output = hook.callback.apply(this, ((is_filter_set ? false : is_filter) ? output : args));
					}
				}
			}
		} else {
			_hooks.each(function HooksEach(hooks, priority) {
				if(_debug) {
					if(Logger == undefined) {
						KnuddelsServer.getDefaultLogger().info('[Hooks] Each: PRIORITY ' + priority);
					} else {
						Logger.info('[Hooks] Each: PRIORITY ' + priority);
					}
				}
				
				hooks.each(function HooksEach(hook) {
					if(hook.name == name) {
						if(typeof(output) != 'array') {
							output = [ output ];
						}
						
						output = hook.callback.apply(this, ((is_filter_set ? false : is_filter) ? output : args));
					}
				});
			});
		}
		
		return output;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Hooks_toString
	*/
	this.toString = function toString() {
		return '[KFramework Hooks]';
	};
}());