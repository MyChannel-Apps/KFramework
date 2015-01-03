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
	
	this.init = function() {
		if(_watcher != undefined) {
			clearInterval(_watcher);
		}
		
		_watcher	= setInterval(this.run, 500);
	};
	
	this.run = function() {
		var time = new Date();
		
		for(var index in _cronjobs) {
			var job = _cronjobs[index];
			
			if(!job.isRunning()) {
				continue;
			}
			
			if(time.getTime() - job.getLastRun().getTime() > 60000) {
				if(Cron.match(job.getMinutes(), time.getMinutes())) {
					if(Cron.match(job.getHours(), time.getHours())) {
						if(Cron.match(job.getYear(), time.getDate())) {
							if(Cron.match(job.getMonth(), time.getMonth())) {
								if(Cron.match(job.getDay(), time.getDay())) {
									job.run(time);
								}
							}
						}
					}
				}
			}
		}
	};
	
	this.add = function(cronjob) {
		_cronjobs.push(cronjob);
	};
	
	this.match = function(a, b) {
		for(var index = 0; index < a.length; index++) {
			var c = a[index];
			
			if(c[0] === -1 || (b >= c[0] && b <= c[1])) {
				var b0 = b - c[0]; // make the modulo start from 1st miniture of from matched time, not first minute of from 0 minutes
				
				if(c[2] === -1 || b0 === 0 || b0 % c[2] === 0) {
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
	
	this.onShutdown = function() {
		for(var index in _cronjobs) {
			_cronjobs[index].onShutdown();
		}
		
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
		day:	'*',
		month:	'*',
		year:	'*',
		minute:	'*',
		hour:	'*'
	};
		
	function Cronjob(instance, name, cycle, callback) {
		_name			= name;
		_cycle			= cycle;
		_callback		= callback;
		_cycle_data		= _cycle.match(/^([0-9,\-\/]+|\*{1}|\*{1}\/[0-9]+)\s+([0-9,\-\/]+|\*{1}|\*{1}\/[0-9]+)\s+([0-9,\-\/]+|\*{1}|\*{1}\/[0-9]+)\s+([0-9,\-\/]+|\*{1}|\*{1}\/[0-9]+)\s+([0-9,\-\/]+|\*{1}|\*{1}\/[0-9]+)\s*$/);
		_last_run		= new Date(DB.load('_cronrun_' + _name, 0));
		_last_check		= new Date(DB.load('_croncheck_' + _name, 0));
		_time_data		= {
			day:	Cron.parse(_cycle_data[5]),
			month:	Cron.parse(_cycle_data[4]),
			year:	Cron.parse(_cycle_data[3]),
			minute:	Cron.parse(_cycle_data[1]),
			hour:	Cron.parse(_cycle_data[2])
		};
		instance.start();
		Cron.add(instance);
	}
	
	this.getLastRun = function() {
		return _last_run;
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
		_last_run = time;
		_callback(time);
	};
	
	this.getMinutes = function() {
		return _time_data.minute;
	};

	this.getHours = function() {
		return _time_data.hour;
	};

	this.getYear = function() {
		return _time_data.year;
	};
	
	this.getMonth = function() {
		return _time_data.month;
	};
	
	this.getDay = function() {
		return _time_data.day;
	};
	
	this.onShutdown = function() {
		this.stop();
		
		DB.save('_cronrun_' + _name, _last_run.getTime());
		DB.save('_croncheck_' + _name, _last_check.getTime());
	};
	
	Cronjob(this, name, cycle, callback);
}