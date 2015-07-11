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
	@docs		http://www.mychannel-apps.de/documentation/core/bank
*/

var KBank = (new function KBank() {
	var UiKey = '';
	var updateCallback = null;
	
	this.onKontoUpdate = function(call) {
		updateCallback = call;
	};		
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KBank_getKn
	*/
	this.getKn = function getKn(uid) {
		if(uid === undefined) {
			return;
		}
		
		var _db = Users.get(parseInt(uid)).getPersistence();
		return parseFloat(_db.getNumber('KBank_knuddel', 0.00).toFixed(2));
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KBank_getKonto
	*/
	this.getKonto = function getKonto(uid) {
		if(uid === undefined) {
			return;
		}
		
		var _db = Users.get(parseInt(uid)).getPersistence();
		
		return {
			knuddel: parseFloat(_db.getNumber('KBank_knuddel', 0.00).toFixed(2)),
			buyin: parseFloat(_db.getNumber('KBank_buyin', 0.00).toFixed(2)),
			payout: parseFloat(_db.getNumber('KBank_payout', 0.00).toFixed(2))
		};
	};
	
	/*
		@docs	TODO
	*/
	this.resetKonto = function resetKonto(uid) {
		if(uid === undefined) {
			return;
		}
		
		var _db = Users.get(parseInt(uid)).getPersistence();
		
		_db.deleteNumber('KBank_knuddel');
		_db.deleteNumber('KBank_buyin');
		_db.deleteNumber('KBank_payout');
		
		if(updateCallback) {
			updateCallback(Users.get(parseInt(uid)), this.getKn(uid));
		}
	};

	/*
		@docs	http://www.mychannel-apps.de/documentation/KBank_setKn
	*/
	this.setKn = function setKn(uid, kn) {
		if(uid === undefined) {
			return;
		}
		
		if(kn === undefined) {
			return;
		}
		
		if(kn < 0.00) {
			return false;
		}

		var _db = Users.get(parseInt(uid)).getPersistence();
		_db.setNumber('KBank_knuddel', kn);
		
		if(updateCallback) {
			updateCallback(Users.get(parseInt(uid)), this.getKn(uid));
		}
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KBank_addKn
	*/
	this.addKn = function addKn(uid, kn) {
		if(uid === undefined) {
			return;
		}
		
		if(kn === undefined) {
			return;
		}
		
		if(kn <= 0.00) {
			return false;
		}
		
		var _db = Users.get(parseInt(uid)).getPersistence();
		_db.addNumber('KBank_knuddel', kn);
		
		if(updateCallback) {
			updateCallback(Users.get(parseInt(uid)), this.getKn(uid));
		}
		
		return true;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KBank_delKn
	*/
	this.delKn = function delKn(uid, kn) {
		Logger.info('KBank.delKn(uid, kn) is DEPRECATED, use KBank.subKn(uid, kn)');
		return this.subKn(uid, kn);
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KBank_subKn
	*/
	this.subKn = function subKn(uid, kn) {
		if(uid === undefined) {
			return;
		}
		
		if(kn === undefined) {
			return;
		}
	
		if(kn <= 0.00) {
			return false;
		}
	
		if(kn > this.getKn(uid)) {
			return false;
		}

		var _db = Users.get(parseInt(uid)).getPersistence();		
		_db.addNumber('KBank_knuddel', -kn);
		
		if(updateCallback) {
			updateCallback(Users.get(parseInt(uid)), this.getKn(uid));
		}
		
		return true;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KBank_payout
	*/
	this.payout = function payout(uid, kn, reason) {
		if(uid === undefined) {
			return false;
		}
		
		if(kn === undefined) {
			return false;
		}

		if(kn < 0) {
			return false;
		}
		
		if(kn > this.getKn(uid)) {
			return false;
		}
		
		if(kn > Bot.getKnuddels()) {
			return false;
		}
		
		if(kn >= 1000000) {
			return false;
		}
		
		var _user = Users.get(parseInt(uid));
		var _db = _user.getPersistence();
		_db.addNumber('KBank_knuddel', -kn);
		_db.addNumber('KBank_payout', kn);
		Bot.knuddel(_user, kn, reason);
		
		if(updateCallback) {
			updateCallback(Users.get(parseInt(uid)), this.getKn(uid));
		}
		
		return true;
	};

	/*
		@docs	http://www.mychannel-apps.de/documentation/KBank_payin
	*/
	this.payin = function payin(uid, kn) {
		if(uid === undefined) {
			return;
		}
		
		if(kn === undefined) {
			return;
		}

		if(kn <= 0.00) {
			return false;
		}
		
		var _db = Users.get(parseInt(uid)).getPersistence();
		_db.addNumber('KBank_knuddel', kn);
		_db.addNumber('KBank_buyin', kn);
		
		if(updateCallback) {
			updateCallback(Users.get(parseInt(uid)), this.getKn(uid));
		}
		
		return true;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KBank_getUsers
	*/
	this.getUsers = function getUsers(callback) {
		if(typeof callback !== 'function') {
			Logger.info('KBank.getUsers() is DEPRECATED, use it like this KBank.getUsers(function(userIds, total){ });');
			return false;
		}
		
		var _users = [];
		
		UserPersistenceNumbers.each('KBank_knuddel', function UserPersistenceNumbersEach(user, value, index, total, key) {
			_users.push(user.getUserId());
		}, {
			ascending:false,
			onStart: function onStart(totalCount) {
				_users = [];
			},
			onEnd: function onEnd(totalCount) {
				callback.call(this, _users, totalCount);
			}
		});
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KBank_getStats
	*/
	this.getStats = function getStats() {
		return {
			users: DB.count('KBank_knuddel'),
			knusers: DB.count('KBank_knuddel', 0.01),
			knuddel: parseFloat(DB.sum('KBank_knuddel')),
			buyin: parseFloat(DB.sum('KBank_buyin')),
			payout: parseFloat(DB.sum('KBank_payout'))
		};
	};

	/*
		@docs	http://www.mychannel-apps.de/documentation/KBank_getTransit
	*/
	this.getTransit = function getTransit() {
		return parseFloat(DB.sum('KBank_knuddel'));
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KBank_toString
	*/
	this.toString = function toString() {
		return '[KFramework KBank]';
	};
	
	/*
		@ToDo
		@docs	http://www.mychannel-apps.de/documentation/KBank_dataMigration
		This works full automated, dont call this in Your App!!!
	*/
	this.dataMigration = function dataMigration() {
		if(DB.check('_bank', {}) == false) {
			return true;
		}
		
		var migrate = DB.load('_bank', {});
		
		if(!migrate.size()) {
			DB.delete('_bank');
			Logger.info('KBank fully migrated! You can now delete all "KBank.saveData()" and "KBank.loadData()" calls from your AppCode');
			return false;
		};

		var _db = null;
		var migrated = [];
		var start = new Date().getTime();
		migrate.each(function MigrateEach(konto, uid) {
			_db = Users.get(parseInt(uid)).getPersistence();
			_db.setNumber('KBank_knuddel', parseFloat(konto.knuddel.toFixed(2)));
			_db.setNumber('KBank_buyin', parseFloat(konto.buyin.toFixed(2)));
			_db.setNumber('KBank_payout', parseFloat(konto.payout.toFixed(2)));
			migrated.push(uid);
			
			if((new Date().getTime()-start) > 9000) {
				return false;
			}
		});
		
		if(migrate.size() == migrated.size()) {
			DB.delete('_bank');
			Logger.info('KBank fully migrated! You can now delete all "KBank.loadData()" and "KBank.saveData()" calls from your AppCode');
		} else {
			migrated.each(function MigratedEach(uid) {
				delete migrate[uid];
			});
			DB.save('_bank', migrate);			
			Logger.info('KBank can´t migrate all data at once ('+migrated.size()+' of '+migrate.size()+' finish). Please restart this App to migrate the last '+(migrate.size()-migrated.size())+' KBank Entrys');
		}
		return false;
	};
	
	/*
		@ToDo
	*/
	this.getData = function getData() {
		Logger.info('KBank.getData() is DEPRECATED, you dont need this all any more!');
	};
	
	/*
		@ToDo
	*/
	this.loadData = function loadData() {
		Logger.info('KBank.loadData() is DEPRECATED, you dont need this all any more!');
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KBank_saveData
	*/
	this.saveData = function saveData() {
		Logger.info('KBank.saveData() is DEPRECATED, you dont need this all any more!');
	};

	/*
		@docs	http://www.mychannel-apps.de/documentation/KBank_resetData
	*/
	this.resetData = function resetData() {
		Logger.info('KBank.resetData() is DEPRECATED, you dont need this all any more!');
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KBank_fixData
	*/
	this.fixData = function fixData() {
		Logger.info('KBank.fixData() is DEPRECATED, you dont need this all any more!');
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KBank_cleanData
	*/
	this.cleanData = function cleanData() {
		Logger.info('KBank.cleanData() is DEPRECATED, you dont need this all any more!');
	};
}());