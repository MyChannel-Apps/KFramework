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

var Logger = (new function() {
	var _logger;
	var _watcher;
	
	function Logger() {
		_logger = KnuddelsServer.getDefaultLogger();
		_watcher = {};
	};
	
	this.addLogUser = function(uid, types) {
		_watcher[uid] = types || 'E_ALL';
	};

	this.delLogUser = function(uid) {
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
		
		lines.each(function(line, index) {
			if(index <= 1) {
				return;
			}
			
			output += '\n' + line;
		});
		return output;
	};
	
	sendLog = function(prefix, message) {
		_watcher.each(function(value, uid) {
			if(value.contains(prefix) || value == 'E_ALL') {
				Users.get(uid).sendPrivateMessage(prefix+': '+message);
			}
		});
	};

	this.debug = function(message) {
		_logger.debug(message + getStrackTrace());
		sendLog('DEBUG', message);
	};
	
	this.info = function(message) {
		_logger.info(message + getStrackTrace());
		sendLog('INFO', message);
	};
	
	this.error = function(message) {
		_logger.error(message + getStrackTrace());
		sendLog('ERROR', message);
	};
	
	this.fatal = function(message) {
		_logger.fatal(message + getStrackTrace());
		sendLog('FATAL', message);
	};
	
	this.warn = function(message) {
		_logger.warn(message + getStrackTrace());
		sendLog('WARN', message);
	};
	
	Logger();
}());