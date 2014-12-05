var App;
var Bot;
var Container = {
	_layout:	UI.Poker
};

require('framework/UI.js');

function bootstrap(instance) {
	Bot = (new function() {
		var _user = KnuddelsServer.getDefaultBotUser();
		
		this.publicMessage = function(message) {
			_user.sendPublicMessage(message);
		};
	}());
	
	App = (new function() {
		this.onAppStart = registerFramework(instance.init);
	}());
};

function registerFramework(func) {
	func.getUI = function() {
		return Container._layout;
	};
	
	func.setUI = function(layout) {
		Container._layout = layout;
	};
	
	return func;
}