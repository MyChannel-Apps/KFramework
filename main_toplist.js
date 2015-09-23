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

/**
	Sample:
	Du brauchst nur drei Dinge erledigen um eine Topliste zu implementieren:
	
	- Bei onAppStart definierst du deine Toplisten.
	  Der Erste Parameter ist der Persistence-Key, der Zweite ein Array
	  mit der Haupt- bzw. Unterkategorie. Optional können noch die Events
	  onOpen und onClose definiert werden (sinnvoll wenn die Topliste
	  geschlossen wird und man dann etwas tun möchte; Beispiel die alte
	  View anzeigen)
	- Bei onEventReceived wird das Event "toplist" hinzugefügt.
	  Dies ist für die Pagination wichtig!
	- Unter chatCommands wird der Befehl /toplist registriert
	
	Das war's auch schon :-)
*/
var App = (new function() {
	/* App Events */
	this.onAppStart = function() {
		/* Toplist Events */
		Top.addEvent('onOpen', function onOpen(user, data) {
			user.private(JSON.format(data));
		});
		
		Top.addEvent('onClose', function onClose(user, data) {
			user.private(JSON.format(data));
		});
		
		new Toplist('points_all', [ 'Points', 'All' ]);
		new Toplist('points_week', [ 'Points', 'Week' ]);
	};
	
	this.onEventReceived = function onEventReceived(user, name, value) {
		switch(name) {
			case 'toplist':
				if(typeof(value) == 'boolean' && value) {
					user.sendEvent('toplist', Top.getCategorys());
					return;
				}
				
				Top.handleEvent(user, value);
			break;
			
			/* Other Events */
		}
	};
	
	/* Chat Commands */
	this.chatCommands = {
		Toplist: function Toplist(user, params) {
			Top.handleCommand(user, params);
		}
	};
}());