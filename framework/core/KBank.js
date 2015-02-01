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
				knuddel:	0.00,
				buyin:		0.00,
				payout:		0.00,
			};
		}
	};
	
	this.getKn = function(uid) {
		if(uid === undefined) {
			return;
		}
		
		this.create(uid);
		
		return parseFloat(_data[uid].knuddel.toFixed(2));
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
		_data[uid].knuddel = parseFloat(_data[uid].knuddel.toFixed(2));
	};
	
	this.delKn = function(uid, kn) {
		if(Logger == undefined) {
			KnuddelsServer.getDefaultLogger().info('KBank.delKn(uid, kn) is DEPRECATED, use KBank.subKn(uid, kn)');
		} else {
			Logger.info('KBank.delKn(uid, kn) is DEPRECATED, use KBank.subKn(uid, kn)');
		}
		
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
			// return false;
		}
		
		if(_data[uid].knuddel < kn) {
			return false;
		}
		
		_data[uid].knuddel -= kn;
		_data[uid].knuddel = parseFloat(_data[uid].knuddel.toFixed(2));
		
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
		
		_data[uid].knuddel	-= kn;
		_data[uid].payout	+= kn;
		_data[uid].knuddel	= parseFloat(_data[uid].knuddel.toFixed(2));
		_data[uid].payout	= parseFloat(_data[uid].payout.toFixed(2));

		// @ToDo Chris, pls check if Bot has knuddel available!
		if(Bot == undefined) {
			KnuddelsServer.getDefaultBotUser().transferKnuddel(KnuddelsServer.getUser(uid), kn, reason);
		} else {
			Bot.knuddel(KnuddelsServer.getUser(uid), kn, reason);
		}
		
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
		
		_data[uid].knuddel	+= kn;
		_data[uid].buyin	+= kn;
		_data[uid].knuddel	= parseFloat(_data[uid].knuddel.toFixed(2));
		_data[uid].buyin	= parseFloat(_data[uid].buyin.toFixed(2));
		
		return true;
	};
	
	this.loadData = function() {
		if(DB == undefined) {
			_data = KnuddelsServer.getPersistence().getObject('_bank', _data);
		} else {
			_data = DB.load('_bank', _data);
		}
		
		this.fixData();
	};
	
	this.saveData = function() {
		this.cleanData();
		
		if(DB == undefined) {
			KnuddelsServer.getPersistence().setObject('_bank', _data);
		} else {
			DB.save('_bank', _data);
		}
	};

	this.resetData = function() {
		_data = {};
		
		if(DB == undefined) {
			KnuddelsServer.getPersistence().setObject('_bank', _data);
		} else {
			DB.save('_bank', _data);
		}
	};
	
	this.fixData = function() {
		if(!Object.prototype.each) {
			for(var uid in _data) {
				_data[uid].knuddel	= parseFloat(_data[uid].knuddel.toFixed(2));
				_data[uid].buyin	= parseFloat(_data[uid].buyin.toFixed(2));
				_data[uid].payout	= parseFloat(_data[uid].payout.toFixed(2));
			}
		} else {
			_data.each(function(konto, uid) {
				_data[uid].knuddel	= parseFloat(_data[uid].knuddel.toFixed(2));
				_data[uid].buyin	= parseFloat(_data[uid].buyin.toFixed(2));
				_data[uid].payout	= parseFloat(_data[uid].payout.toFixed(2));
			});
		}
	};
	
	this.cleanData = function() {
		var newDB = {};
		
		if(!Object.prototype.each) {
			for(var uid in _data) {
				var konto = _data[uid];
				
				if(konto.knuddel > 0.00 || konto.buyin > 0.00 || konto.payout > 0.00) {
					newDB[uid] = konto;
				}
			}
		} else {
			_data.each(function(konto, uid) {
				if(konto.knuddel > 0.00 || konto.buyin > 0.00 || konto.payout > 0.00) {
					newDB[uid] = konto;
				}
			});
		}
		
		_data = newDB;
	};
	
	this.getData = function() {
		return _data;
	};
	
	this.getUsers = function() {
		return Object.keys(_data);
	};
	
	this.getTransit = function() {
		var transit = 0.00;
		
		if(!Object.prototype.each) {
			for(var entry in _data) {
				var konto	= _data[entry];
				transit		+= konto.knuddel;
			}
		} else {
			_data.each(function(konto) {
				transit += konto.knuddel;
			});
		}
		
		return parseFloat(transit.toFixed(2));;
	};
	
	this.fixData();
}());