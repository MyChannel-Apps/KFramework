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
	@docs		http://www.mychannel-apps.de/documentation/core/bot
*/

function View(name) {
	var _name			= name;
	var _width			= 100;
	var _height			= 100;
	var _mode			= AppViewMode.Overlay;
	var _data			= {};
	var _send_callback	= undefined;
	var _view;
	var _file;
	
	this.setSize = function setSize(width, height) {
		_width	= width;
		_height	= height;
	};
	
	this.getMode = function getMode() {
		return _mode;
	};
	
	this.setMode = function setMode(mode) {
		_mode = mode;
	};
	
	this.close = function close(user) {
		user.sendEvent('close', true);
	};
	
	this.setCallback = function setCallback(callback) {
		_send_callback = callback;
	};
	
	this.send = function send(user) {
		if(AppContent.popupContent == undefined) {
			_mode	= AppViewMode.Overlay;
		}
		
		switch(_mode) {
			case AppViewMode.Overlay:
				this.addString('_view_mode', 'overlay');
				_file = new HTMLFile(_name + '.html', _data);
				_view = AppContent.overlayContent(_file, _width, _height);
			break;
			case AppViewMode.Popup:
				this.addString('_view_mode', 'popup');
				_file = new HTMLFile(_name + '.html', _data);
				_view = AppContent.popupContent(_file, _width, _height);
			break;
			default:
				Logger.info('Bad AppContent Mode!');
				return false;
			break;
		}

		// JavaVersion 7 in Nutzung
		if(user.getClientType() == ClientType.Applet && !user.canSendAppContent(_view)) {
			var text = new KCode();
			text.newLine();
			text.append('°RR°_ACHTUNG:_°r° Du benötigst mindestens _Java 8_ um _' + KnuddelsServer.getAppInfo().getAppName() + '_ zu spielen.');
			text.newLine();
			text.append('Um dieses Problem zu beheben bestehen 2 Möglichkeiten:');
			text.newLine();
			text.append('_1._ Java auf eine aktuelle Version updaten: _°BB>Java updaten|https://www.java.com/de/download/<°_°r° (empfohlen)');
			text.newLine();
			text.append('_2._ Den Mini-Chat nutzen: _°BB>Zum Mini-Chat|http://www.knuddels.de/htmlchat<°_°r°');
			user.sendPrivateMessage(text);
			return false;
		}
		
		if(!user.isOnlineInChannel() || !user.canSendAppContent(_view) || !user.canShowAppViewMode(_mode)) {
			return false;
		}
		
		user.sendAppContent(_view);
		
		if(typeof(_send_callback) != 'undefined') {
			_send_callback(this, user);
		}
		
		return true;
	};
	
	/*
		Strings
	*/
	this.getString = function getString(key, defaultValue) {
		return this.getObject(key, defaultValue);
	};
	
	this.addString = function addString(key, value) {
		this.addObject(key, value);
	};
	
	this.removeString = function removeString(key) {
		this.removeObject(key);
	};
	
	this.hasString = function hasString(key) {
		return this.hasObject(key);
	};
	
	/*
		Number
	*/
	this.getNumber = function getNumber(key, defaultValue) {
		return this.getObject(key, defaultValue);
	};
	
	this.addNumber = function addNumber(key, value) {
		this.addObject(key, value);
	};
	
	this.removeNumber = function removeNumber(key) {
		this.removeObject(key);
	};
	
	this.hasNumber = function hasNumber(key) {
		return this.hasObject(key);
	};
	
	/*
		Object
	*/
	this.getObject = function getObject(key, defaultValue) {
		if(this.hasObject(key)) {
			return _data[key];
		}
		
		return defaultValue;
	};
	
	this.addObject = function addObject(key, value) {
		_data[key] = value;
	};
	
	this.removeObject = function removeObject(key) {
		delete _data[key];
	};
	
	this.hasObject = function hasObject(key) {
		return (_data[key] != undefined);
	};
	
	this.toString = function toString() {
		return 'View';
	};
};