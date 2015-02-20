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
	@docs		http://www.mychannel-apps.de/documentation/core/kcode
*/

var load = [
	'KButton',
	'KTooltip',
	'KLink',
	'KCountdown',
	'KFont',
	'KImage',
	'KColor',
	'KTable',
	'KGroup'
];

load.each(function(name) {
	require('framework/ui/' + name + '.js');
});

var Alignment = {
	/*
		@docs	http://www.mychannel-apps.de/documentation/Alignment_LEFT
	*/
	LEFT:		'°>LEFT<°',
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Alignment_MIDDLE
	*/
	MIDDLE:		'°>CENTER<°',
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Alignment_CENTER
	*/
	CENTER:		'°>CENTER<°',
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Alignment_RIGHT
	*/
	RIGHT:		'°>RIGHT<°',
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/Alignment_JUSTIFY
	*/
	JUSTIFY:	'°>JUSTIFY<°'
};

/*
	@docs	http://www.mychannel-apps.de/documentation/KCode_constructor
*/
function KCode() {
	var _buffer = [];
	var _debug	= false;
	var _minify	= true;
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KCode_append
	*/
	this.append = function(component) {
		_buffer.push(component);
		return this;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KCode_newLine
	*/
	this.newLine = function(dotted) {
		_buffer.push('°#');
		
		if(dotted == undefined ? false : dotted) {
			_buffer.push('!');
		}
		
		_buffer.push('°');
		
		// DEPRECATED!
		_buffer.push('#');
		return this;		
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KCode_newHr
	*/
	this.newHr = function() {
		_buffer.push('°-°');
		return this;		
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KCode_addDots
	*/
	this.addDots = function() {
		_buffer.push('.........');
		return this;		
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KCode_setAlignment
	*/
	this.setAlignment = function(alignment) {
		_buffer.push(alignment);
		return this;		
	};	
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KCode_addImage
	*/
	this.addImage = function(file) {
		Logger.info('KCode.addImage(file) is DEPRECATED');
		
		_buffer.push('°>' + KnuddelsServer.getFullImagePath(file) + '<°');
		return this;		
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KCode_disableOptimization
	*/
	this.disableOptimization = function(state) {
		_minify = state;
		return this;		
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KCode_toString
	*/
	this.toString = function() {
		var string = '';
		
		_buffer.each(function(component) {
			if(typeof(component) == 'string' || typeof(component) == 'number') {
				string		+= component;
			} else if(component != undefined && component != null) {
				string		+= component.toString();
			}
		});
		
		if(_debug) {
			string = string.replace(/°/g, '\\°');
		}
		
		if(_minify) {
			string = string.replace(/°°/g, '');
		}
		
		return string;
	};
};