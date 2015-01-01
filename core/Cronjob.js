function Cronjob(name, cycle, callback) {
	var _name		= '';
	var _cycle		= '* * * * *';
	var _cycle_data	= [];
	var _callback	= function(time) { /* Override Me */ };
	var _last_run	= undefined;
	var _watcher;
	
	function Cronjob(instance, name, cycle, callback) {
		_name		= name;
		_cycle		= cycle;
		_callback	= callback;
		_cycle_data = _cycle.match(/^([0-9]+|\*{1})[ \n\t\b]+([0-9]+|\*{1})[ \n\t\b]+([0-9]+|\*{1})[ \n\t\b]+([0-9]+|\*{1})[ \n\t\b]+([0-9]+|\*{1})[ \n\t\b]*$/);
		db = DB.load('_cronjob_' + _name, {run:undefined, check:undefined});
		_last_run	= new Date(db.run);
		_last_check	= new Date(db.check);		
		
		
		if(new Date().getTime() < _last_check.getTime()) {
			
			while(true) {
				time = new Date(_last_check.getTime()+500);
				if(this.check(time)) {
					_last_run = time
					_callback(_last_run);
					break;
				}
			}
		}
		
		instance.start();
	}
	
	this.start = function() {
		this.stop();
		_watcher	= setInterval(this.run, 500);	
	};
	
	this.stop = function() {
		if(_watcher != undefined) {
			clearInterval(_watcher);
		}
	};
	
	this.check = function(time) {
		var day		= _cycle_data[5] || '*';
		var month	= _cycle_data[4] || '*';
		var year	= _cycle_data[3] || '*';
		var minute	= _cycle_data[1] || '*';
		var hour	= _cycle_data[2] || '*';

		_last_check = time;
		
		if(time.getTime() - _last_run.getTime() > 60000) {
			if(minute == '*' || parseInt(minute) == time.getMinutes()) {
				if(hour == '*' || parseInt(hour) == time.getHours()) {
					if(day == '*' || parseInt(day) == time.getDate()) {
						if(month == '*' || (parseInt(month) - 1) == time.getMonth()) {
							if(day == '*' || parseInt(day) == time.getDay()) {
								return true;
							}
						}
					}
				}
			}
		}
		return false;		
	};
	
	this.run = function() {
		var time	= new Date();
		
		if(this.check(time)) {
			_last_run = time;
			_callback(time);
		}
		
		_last_check = time;
	};
	
	this.onShutdown = function() {
		DB.save('_cronjob_' + _name, {run:_last_run.toGMTString(), check:_last_check.toGMTString()});
	};
	
	Cronjob(this, name, cycle, callback);
}