function Cronjob(name, cycle, callback) {
	var _name		= '';
	var _cycle		= '* * * * *';
	var _cycle_data	= [];
	var _callback	= function(time) { /* Override Me */ };
	var _last_run	= undefined;
	var _watcher;
	
	function Cronjob(instance, name, cycle, callback) {
		var db		= DB.getChannel();
		_name		= name;
		_cycle		= cycle;
		_callback	= callback;
		_cycle_data = _cycle.match(/^([0-9]+|\*{1})[ \n\t\b]+([0-9]+|\*{1})[ \n\t\b]+([0-9]+|\*{1})[ \n\t\b]+([0-9]+|\*{1})[ \n\t\b]+([0-9]+|\*{1})[ \n\t\b]*$/);
		_last_run	= new Date(db.getString('_cronjob_' + _name, undefined));
		
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
	
	this.run = function() {
		var time	= new Date();
		var day		= _cycle_data[5] || '*';
		var month	= _cycle_data[4] || '*';
		var year	= _cycle_data[3] || '*';
		var minute	= _cycle_data[1] || '*';
		var hour	= _cycle_data[2] || '*';
		
		if(time.getTime() - _last_run.getTime() > 60000) {
			if(minute == '*' || parseInt(minute) == time.getMinutes()) {
				if(hour == '*' || parseInt(hour) == time.getHours()) {
					if(day == '*' || parseInt(day) == time.getDate()) {
						if(month == '*' || (parseInt(month) - 1) == time.getMonth()) {
							if(day == '*' || parseInt(day) == time.getDay()) {
								_last_run = time;
								_callback(time);
							}
						}
					}
				}
			}
		}
	};
	
	this.onShutdown = function() {
		var db		= DB.getChannel();
		
		db.deleteString('_cronjob_' + _name);
		db.setString('_cronjob_' + _name, _last_run.toGMTString());
	};
	
	Cronjob(this, name, cycle, callback);
}