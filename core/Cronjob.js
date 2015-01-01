function Cronjob(name, cycle, callback) {
	var _name		= '';
	var _cycle		= '* * * * *';
	var _cycle_data	= [];
	var _callback	= function(time) { /* Override Me */ };
	var _last_run	= undefined;
	var _last_check = undefined;
	var _watcher;
		
	function Cronjob(instance, name, cycle, callback) {
		_name		= name;
		_cycle		= cycle;
		_callback	= callback;
		_cycle_data = _cycle.match(/^([0-9]+|\*{1})[ \n\t\b]+([0-9]+|\*{1})[ \n\t\b]+([0-9]+|\*{1})[ \n\t\b]+([0-9]+|\*{1})[ \n\t\b]+([0-9]+|\*{1})[ \n\t\b]*$/);
		_last_run	= new Date(DB.load('_cronrun_' + _name, 0));
		_last_check	= new Date(DB.load('_croncheck_' + _name, 0));
		
		if(new Date().getTime() > _last_check.getTime() && _last_check.getTime() != 0) {
			while(true) {
				time = new Date(_last_check.getTime()+500);
				if(check(time)) {
					_last_run = time
					_callback(_last_run);
					break;
				}

				if(new Date().getTime() <= _last_check.getTime()) {
					break;
				}
			}
		}

		instance.start();
	}
	
	this.start = function() {
		this.stop();
		_watcher	= setInterval(run, 500);	
	};
	
	this.stop = function() {
		if(_watcher != undefined) {
			clearInterval(_watcher);
		}
	};
	
	function check(time) {
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
	
	function run() {
		var time	= new Date();

		if(check(time)) {
			_last_run = time;
			_callback(time);
		}
	};
	
	this.onShutdown = function() {
		DB.save('_cronrun_' + _name, _last_run.getTime());
		DB.save('_croncheck_' + _name, _last_check.getTime());
	};
	
	Cronjob(this, name, cycle, callback);
	//ohne komm ich nicht an .shutdown ran, kp wie du das machst :D
	return this;
}