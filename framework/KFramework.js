/**
	The MIT License (MIT)

	Copyright (c) 2014 UserApps.de

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

var VERSION		= '1.1.0';

var KFramework = (new function KFramework() {
	this.load = [
		/* Tools */
		'tools/JSON',
		'tools/Functions',
		'tools/Number',
		'tools/String',
		'tools/Array',
		'tools/Object',
		'tools/User',
		'tools/Dice',
		'tools/StringBuffer',
		
		/* Core */
		'core/Hash',
		'core/Hooks',
		'core/Database',
		'core/Logger',
		'core/Cronjob',
		'core/Bot',
		'core/KCode',
		'core/KBank',
		'core/Files',		
		'core/Channel',
		'core/User',
		/* 'core/AppStore', */
		'core/View',
		'core/Toplist',
		'core/AppInfo'
		/* 'core/KConfig' */
	];
	
	for(var entry in this.load) {
		require('framework/' + this.load[entry] + '.js');
	}
	
	this.startUp = function startUp() {
		KBank.dataMigration();
	};
	
	this.store = function store() {
		Cron.saveData();
	};
	
	this.shutDown = function shutDown() {
		Cron.onShutdown();
	};
	
	this.toString = function toString() {
		return '[KFramework Core]';
	};
}());
