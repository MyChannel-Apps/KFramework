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
	
	@author		Adrian Preuß <Bizarrus>
*/

var Logger = (new function Logger() {
	var _logger;
	var _watcher;
	
	function Logger() {
		_logger		= KnuddelsServer.getDefaultLogger();
		_watcher	= {};
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Logger_addLogUser
	*/
	this.addLogUser = function addLogUser(uid, types) {
		Logger.info('Logger.addLogUser(uid, types) is DEPRECATED');
		
		_watcher[uid] = types || 'E_ALL';
	};

	/*
		@docs	http://www.mychannel-apps.de/documentation/Logger_delLogUser
	*/
	this.delLogUser = function delLogUser(uid) {
		Logger.info('Logger.delLogUser(uid) is DEPRECATED');
		if(_watcher[uid] != undefined) {
			
			delete _watcher[uid];
		}
	};
	
	function getStrackTrace() {
		try {
			null.toString();
		} catch(e) {
			return prettyStackTrace(e.stack);
		}
		
		return '';
	};
	
	function prettyStackTrace(stack) {
		var lines	= stack.replace(/\t/g, '     ').replace(/\(anonymous\)/g, '').replace(/at (.*)@(.*): /g, 'at ').split('\n');
		var output	= '';
		
		if(!Object.prototype.each) {
			for(var index in lines) {
				if(index <= 1) {
					return;
				}
				
				output += '\n' + lines[index];
			}
		} else {
			lines.each(function LinesEach(line, index) {
				if(index <= 1) {
					return;
				}
				
				output += '\n' + line;
			});
		}
		
		return output;
	};
	
	function sendLog(prefix, message) {
		if(_watcher.size() > 0) {
			Logger.info('Logger.sendLog(prefix, message) is DEPRECATED - Don\'t use Logger.addLogUser(uid, types) or Logger.delLogUser(uid)!');
		}
		
		_watcher.each(function WatcherEach(value, uid) {
			if(value.contains(prefix) || value == 'E_ALL') {
				Users.get(uid).sendPrivateMessage(prefix + ': ' + message);
			}
		});
	};

	/*
		@docs	http://www.mychannel-apps.de/documentation/Logger_debug
	*/
	this.debug = function debug(message) {
		_logger.debug(message + getStrackTrace());
		sendLog('DEBUG', message);
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Logger_info
	*/
	this.info = function info(message) {
		_logger.info(message + getStrackTrace());
		sendLog('INFO', message);
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Logger_error
	*/
	this.error = function error(message) {
		_logger.error(message + getStrackTrace());
		sendLog('ERROR', message);
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Logger_fatal
	*/
	this.fatal = function fatal(message) {
		_logger.fatal(message + getStrackTrace());
		sendLog('FATAL', message);
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Logger_warn
	*/
	this.warn = function warn(message) {
		_logger.warn(message + getStrackTrace());
		sendLog('WARN', message);
	};
	
	this.toString = function toString() {
		return '[KFramework Logger]';
	};
	
	Logger();
}());