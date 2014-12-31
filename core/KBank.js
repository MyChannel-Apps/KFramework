var KBank = (new function(data) {
	var _data = DB.load('_bank');
	this.fixData();
	
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
	
	this.saveData = function() {
		this.cleanData();
		DB.save('_bank', _data);
	};

	this.resetData = function() {
		DB.save('_bank', {});
		_data = {};		
	};
	
	this.fixData = function() {
		for(uid in _data) {
			_data[uid].knuddel = parseFloat(_data[uid].knuddel);
			_data[uid].buyin = parseFloat(_data[uid].buyin);
			_data[uid].payout = parseFloat(_data[uid].payout);
		}
	};
	
	this.cleanData = function() {
		for(uid in _data) {
			if(_data[uid].knuddel != 0.00) { continue; }
			if(_data[uid].buyin != 0.00) { continue; }
			if(_data[uid].payout != 0.00) { continue; }
			delete _data[uid];
		}
	};
	
	this.getUsers = function() {
		return Object.keys(_data);
	};
	
	this.getTransit = function() {
		transit = 0.00;
		
		for(var uid in _data) {
			transit += this.getKn(uid);
		}
		return transit;
	};
}());