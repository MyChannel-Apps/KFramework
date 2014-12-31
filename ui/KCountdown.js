/*
	Example:
	var counter = new KCountdown();
	counter.setTime(10000);
	counter.setFormat('in [d\' Tage\'] [H\' Stunden\'] [m\' Minuten\'] [s\' Sekunden\']');
	counter.setText('Ich bin abgelaufen!');
*/
function KCountdown() {
	var _properties	= {};
	
	this.setTime = function(time) {
		_properties.time = time;
	};
	
	this.setFormat = function(format) {
		_properties.format = format;
	};
	
	this.setText = function(text) {
		_properties.timeUpText = text;
	};
	
	this.toString = function() {
		var string	= '°>{countdown}';
		var index	= 0;
		
		for(var name in _properties) {
			string += name + '=' + _properties[name];
			
			if(index + 1 < Object.keys(_properties).length) {
				string += '|';
			}
			
			index++;
		}
		
		string += '<°';
		
		return string;
	};
}