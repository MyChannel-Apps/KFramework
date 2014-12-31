function KLink(text) {
	var _text			= '';
	var _command_left	= undefined;
	var _command_right	= undefined;
	var _hover			= true;
	
	function KLink(text) {
		_text = text || '';
	}
	
	function prepareLink(string) {
		return string.replace(/(<|>|\||°)/g, '\\$1');
	}
	
	this.setCommand = function(command_left, command_right) {
		_command_left	= command_left;
		_command_right	= command_right;
	};
	
	this.enableHover = function(state) {
		_hover = state;
	};

	this.toString = function() {
		var string = '°>';
		
		if(_hover == false) {
			string += '_h';
		}
		
		string += prepareLink(_text);
		
		if(_command_left != undefined) {
			string += '|' + _command_left;
		}
		
		if(_command_right != undefined) {
			string += '|' + _command_right;
		}
		
		string += '<°';
		return string;
	};
	
	KLink(text);
};