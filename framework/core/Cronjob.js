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

var Cron = (new function() {
	var _cronjobs	= [];
	var _watcher;
	var _offlineCheck = false;
	
	this.init = function() {
		if(_watcher != undefined) {
			clearInterval(_watcher);
		}
		
		_watcher	= setInterval(this.run, 500);
	};
	
	this.enableOfflineRunCheck = function() {
		_offlineCheck = true;
	};
	
	this.checkOfflineRun = function(job) {
		if(job.getLastCheck() == 0) {
			return;
		}
		
		while(new Date().getTime() >= job.getLastCheck()) {
			var time = new Date(job.getLastCheck()+500);
			job.setLastCheck(time);
			
			if((time.getTime() - job.getLastRun() > 60000) && Cron.match(job.getMinutes(), time.getMinutes())&& Cron.match(job.getHours(), time.getHours()) && Cron.match(job.getDate(), time.getDate()) && Cron.match(job.getMonth(), time.getMonth()) && Cron.match(job.getDay(), time.getDay())) {
				job.run(time);
				return;
			}
		}
	};
	
	this.run = function() {
		var time = new Date();
		
		_cronjobs.each(function(job) {
			if(!job.isRunning()) {
				return;
			}
			
			if((time.getTime() - job.getLastRun() > 60000) && Cron.match(job.getMinutes(), time.getMinutes()) && Cron.match(job.getHours(), time.getHours()) && Cron.match(job.getDate(), time.getDate()) && Cron.match(job.getMonth(), time.getMonth()) && Cron.match(job.getDay(), time.getDay())) {
				job.run(time);
			}
		});
	};
	
	this.add = function(cronjob) {
		_cronjobs.push(cronjob);
		
		if(_offlineCheck) {
			this.checkOfflineRun(cronjob);
		}
	};
	
	this.match = function(a, b) {
		var index	= 0;
		var length	= a.length;
		
		for(; index < length; ++index) {
			var c = a[index];
			
			if(c[0] === -1 || (b >= c[0] && b <= c[1])) {
				var b0 = b - c[0]; // make the modulo start from 1st miniture of from matched time, not first minute of from 0 minutes
				//WHAT THE FUCK IS b0 ?!?!?!?!?! BULLSHIT ..|..
				
				if(c[2] === -1 || b === 0 || b % c[2] === 0) {
					return true;
				}
			}
		}
		
		return  false;
	};
	
	this.parse = function(entry) {
		return entry.split(',').map(function(index) {
			var z = index.split('/');
			var x = z[0].split('-');

			if(x[0] == '*') {
				x[0] = -1;
			}
			
			if(x.length == 1) {
				x.push(x[0]);
			}

			x[2] = z.length === 1 ? -1 : z[1];
			x[0] = parseInt(x[0]); // 0 - from
			x[1] = parseInt(x[1]); // 1 - to
			x[2] = parseInt(x[2]); // 2 modulus 

			return x;
		});
	};
	
	this.saveData = function() {
		_cronjobs.each(function(cron) {
			cron.save();
		});
	};
	
	this.onShutdown = function() {
		_cronjobs.each(function(cron) {
			cron.onShutdown();
		});
		
		if(_watcher != undefined) {
			clearInterval(_watcher);
		}
	};
	
	this.init();
}());

function Cronjob(name, cycle, callback) {
	var _name		= '';
	var _cycle		= '* * * * *';
	var _cycle_data	= [];
	var _is_running	= false;
	var _callback	= function(time) { /* Override Me */ };
	var _last_run	= undefined;
	var _last_check = undefined;
	var _time_data	= {
		minute:	'*',
		hour:	'*',
		date:	'*',
		month:	'*',
		day:	'*'
	};
		
	function Cronjob(instance, name, cycle, callback) {
		_name			= name;
		_cycle			= cycle;
		_callback		= callback;
		_cycle_data		= _cycle.match(/^([0-9,\-\/]+|\*{1}|\*{1}\/[0-9]+)\s+([0-9,\-\/]+|\*{1}|\*{1}\/[0-9]+)\s+([0-9,\-\/]+|\*{1}|\*{1}\/[0-9]+)\s+([0-9,\-\/]+|\*{1}|\*{1}\/[0-9]+)\s+([0-9,\-\/]+|\*{1}|\*{1}\/[0-9]+)\s*$/);
		_crondb			= DB.load('_cron_' + _name, {run:0, check:0});
		_last_run		= new Date(parseInt(_crondb.run));
		_last_check		= new Date(parseInt(_crondb.check));
		_time_data		= {
			minute:	Cron.parse(_cycle_data[1]),
			hour:	Cron.parse(_cycle_data[2]),
			date:	Cron.parse(_cycle_data[3]),
			month:	Cron.parse(_cycle_data[4]),
			day:	Cron.parse(_cycle_data[5])			
		};
		Cron.add(instance);
		instance.start();
	}
	
	this.getLastRun = function() {
		return _last_run.getTime();
	};
	
	this.getName = function() {
		return _name;
	};
	
	this.getLastCheck = function() {
		return _last_check.getTime();
	};
	
	this.setLastCheck = function(time) {
		_last_check = time;
	};
	
	this.isRunning = function() {
		return _is_running;
	};
	
	this.start = function() {
		_is_running	= true;
	};
	
	this.stop = function() {
		_is_running	= false;
	};
	
	this.run = function(time) {
		_last_check	= time;
		_last_run	= time;
		_callback(time);
	};
	
	this.getMinutes = function() {
		return _time_data.minute;
	};

	this.getHours = function() {
		return _time_data.hour;
	};

	this.getDate = function() {
		return _time_data.date;
	};
	
	this.getMonth = function() {
		return _time_data.month;
	};
	
	this.getDay = function() {
		return _time_data.day;
	};
	
	this.save = function() {
		DB.save('_cron_' + _name, {
			run:	this.getLastRun(),
			check:	this.getLastCheck()
		});
	};
	
	this.onShutdown = function() {
		this.stop();
		this.save();
	};
	
	Cronjob(this, name, cycle, callback);
}