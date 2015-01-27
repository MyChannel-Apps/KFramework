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
	
	@author		Adrian Preuß, Bizarrus
*/

require('framework/KFramework.js');

var App = (new function() {
	/* App Events */
	this.onAppStart = function() {
		Hooks.do('onAppStart');
	};
	
	this.onPrepareShutdown = function(secondsTillShutdown) {
		Hooks.do('onPrepareShutdown', secondsTillShutdown);
	};
	
	this.onShutdown = function() {
		Hooks.do('onShutdown');
		
		/* Required if you using Cronjobs! */
		Cron.onShutdown();
	};
	
	/* User Events */
	this.onUserJoined = function(user) {
		Hooks.do('onUserJoined', user);
	};
	
	this.onUserLeft = function(user) {
		Hooks.do('onUserLeft', user);
	};
	
	/* Access Events */
	this.mayJoinChannel = function(user) {
		Hooks.do('mayJoinChannel', user);
	};
	
	/* Message Events */
	this.maySendPublicMessage = function(publicMessage) {
		Hooks.do('maySendPublicMessage', publicMessage);
	};
	
	this.onPrivateMessage = function(privareMessage) {
		Hooks.do('onPrivateMessage', privareMessage);
	};
	
	this.onPublicMessage = function(publicMessage) {
		Hooks.do('onPublicMessage', publicMessage);
	};
	
	/* Knuddel Events */
	this.onKnuddelReceived = function(sender, receiver, knuddelAmount) {
		Hooks.do('onKnuddelReceived', sender, receiver, knuddelAmount);
	};
	
	/* DICE Events */
	this.onUserDiced = function(diceEvent) {
		Hooks.do('onUserDiced', diceEvent);
	};
	
	/* Chat Commands */
	this.chatCommands = {};
}());