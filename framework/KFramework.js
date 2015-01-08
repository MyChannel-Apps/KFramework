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

var VERSION		= '1.0.3';

// Defaults
require('framework/Constants.js');

// Tools
require('framework/tools/String.js');
require('framework/tools/Object.js');
require('framework/tools/Array.js');

// Core
require('framework/core/Database.js');
require('framework/core/Logger.js');
require('framework/core/Cronjob.js');
require('framework/core/Bot.js');
require('framework/core/KCode.js');
require('framework/core/KBank.js');
require('framework/core/Channel.js');
require('framework/core/User.js');
//require('framework/core/KConfig.js');

var KFramework = (new function() {
	this.startUp = function() {
		KBank.loadData();
	};
	
	this.store = function() {
		KBank.saveData();
		Cron.saveData();
	};
	
	this.shutDown = function() {
		KBank.saveData();
		Cron.onShutdown();
	};
}());