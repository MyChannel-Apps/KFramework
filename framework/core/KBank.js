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
	
	@author		Christoph Kühl <djchrisnet>
*/

var KBank = (new function() {
	var _data = {};
	
	this.create = function(uid) {
		if(uid === undefined) {
			return;
		}
		
		if(_data[uid] === undefined) {
			_data[uid] = {
				knuddel: 0.00,
				buyin: 0.00,
				payout: 0.00,
			};
		}
	};
	
	this.getKn = function(uid) {
		if(uid === undefined) {
			return;
		}
		
		this.create(uid);
		return _data[uid].knuddel;
	};
	
	this.getKonto = function(uid) {
		if(uid === undefined) {
			return;
		}
		
		this.create(uid);
		return _data[uid];
	};

	this.setKn = function(uid, kn) {
		if(uid === undefined) {
			return;
		}
		
		if(kn === undefined) {
			return;
		}
		
		this.create(uid);

		if(kn <= 0.00) {
			return false;
		}

		_data[uid].knuddel = kn;
	};
	
	this.addKn = function(uid, kn) {
		if(uid === undefined) {
			return;
		}
		
		if(kn === undefined) {
			return;
		}
		
		this.create(uid);
		_data[uid].knuddel += kn;
	};
	
	this.delKn = function(uid, kn) {
		Logger.info('KBank.delKn(uid, kn) is DEPRECATED, use KBank.subKn(uid, kn)');
		return this.subKn(uid, kn);
	};
	
	this.subKn = function(uid, kn) {
		if(uid === undefined) {
			return;
		}
		
		if(kn === undefined) {
			return;
		}
		
		this.create(uid);
		
		if(kn <= 0.00) {
			return false;
		}
		
		if(_data[uid].knuddel < kn) {
			return false;
		}
		
		_data[uid].knuddel -= kn;
		return true;
	};
	
	this.payout = function(uid, kn, reason) {
		if(uid === undefined) {
			return false;
		}
		
		if(kn === undefined) {
			return false;
		}
		
		if(kn < 0) {
			return false;
		}
		
		if(kn > _data[uid].knuddel) {
			return false;
		}
		
		this.create(uid);
		_data[uid].knuddel -= kn;
		_data[uid].payout += kn;
		
		Bot.knuddel(KnuddelsServer.getUser(uid), kn, reason);
		return true;
	};

	this.payin = function(uid, kn) {
		if(uid === undefined) {
			return;
		}
		
		if(kn === undefined) {
			return;
		}
		
		if(kn < 0) {
			return false;
		}
		
		this.create(uid);
		_data[uid].knuddel += kn;
		_data[uid].buyin += kn;
	};
	
	this.loadData = function() {
		_data = DB.load('_bank');
		this.fixData();
	};
	
	this.saveData = function() {
		this.cleanData();
		DB.save('_bank', _data);
	};

	this.resetData = function() {
		DB.save('_bank', {});
		_data = {};		
	};
	
	this.fixData = function() {
		_data.each(function(uid) {
			_data[uid].knuddel = parseFloat(_data[uid].knuddel);
			_data[uid].buyin = parseFloat(_data[uid].buyin);
			_data[uid].payout = parseFloat(_data[uid].payout);
		});
	};
	
	this.cleanData = function() {
		_data.each(function(uid) {
			if(_data[uid].knuddel != 0.00) { return; }
			if(_data[uid].buyin != 0.00) { return; }
			if(_data[uid].payout != 0.00) { return; }
			delete _data[uid];
		});
	};
	
	this.getUsers = function() {
		return Object.keys(_data);
	};
	
	this.getTransit = function() {
		var transit = 0.00;
		
		_data.each(function(uid) {
			transit += KBank.getKn(uid);
		});
		return transit;
	};
	this.fixData();	
}());