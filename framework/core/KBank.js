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
	var instance		= this;
	var updateCallback	= null;
	var _request_queue	= [];
	
	setInterval(function() {
		var entry	= _request_queue.shift();
		var user	= Users.get(parseInt(entry.user, 10));
		
		if(instance.subKn(entry.user, entry.knuddel)) {
			entry.success(user, entry.knuddel);
		} else {
			++entry.count;
			
			if(entry.count >= 3) {
				entry.error(user, 'NoKnReceived');
				return;
			}
			
			_request_queue.push(entry);
		}
	}, 500);
	
	this.onKontoUpdate = function(call) {
		updateCallback = call;
	};
	
	this.triggerKontoUpdate = function(uid) {
		if(updateCallback) {
			updateCallback(Users.get(parseInt(uid, 10)), this.getKn(uid));
		}
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KBank_getKn
	*/
	this.getKn = function getKn(uid) {
		if(uid === undefined) {
			throw 'No UID submitted!';
		}
		
		var _db = Users.get(parseInt(uid, 10)).getPersistence();
		return parseFloat(_db.getNumber('KBank_knuddel', 0.00).toFixed(2));
	};
	
	/*
		@docs	TODO
	*/
	this.getTotalKn = function getTotalKn(uid) {
		if(uid === undefined) {
			throw 'No UID submitted!';
		}
		
		var _db = Users.get(parseInt(uid, 10)).getPersistence();
		return parseFloat(_db.getNumber('KBank_knuddel', 0.00).toFixed(2))+Users.get(parseInt(uid, 10)).getKnuddelAccount().getKnuddelAmount().asNumber();
	};
	
	/*
		@docs	TODO
	*/	
	this.reqKn = function reqKn(uid, kn, onSuccessCallback, onErrorCallback, reason) {
		if(kn === undefined) {
			throw 'No Knuddel submitted!';
		}

		if(onSuccessCallback === undefined || typeof(onSuccessCallback) !== 'function') {
			throw 'no success Callback';
		}

		if(onErrorCallback === undefined || typeof(onErrorCallback) !== 'function') {
			throw 'no error Callback';
		}
				
		if(kn <= 0.00) {
			onErrorCallback(Users.get(parseInt(uid, 10)), 'KnNullOrNeg');
			return false;
		}
	
		if(kn <= this.getKn(uid)) {
			if(this.subKn(uid, kn)) {
				onSuccessCallback(Users.get(parseInt(uid, 10)), kn);
				return true;
			} else {
				onErrorCallback(Users.get(parseInt(uid, 10)), 'CantGetKn');
				return false;
			}
		}
		
		var knAcc = Users.get(parseInt(uid, 10)).getKnuddelAccount();
		var requestKn = new KnuddelAmount(kn-this.getKn(uid));
		
		if(!knAcc.hasEnough(requestKn)) {
			onErrorCallback(Users.get(parseInt(uid, 10)), 'KnNotEnough');
			return false;
		}
		
		knAcc.use(requestKn, reason || 'Einzahlung', {
			transferReason: reason || 'Einzahlung',
			onError: function KnOnError() {
				onErrorCallback(Users.get(parseInt(uid, 10)), 'KnuddelAccountError');
			},
			onSuccess: function KnOnSuccess() {
				_request_queue.push({
					user:		uid,
					knuddel:	kn,
					success:	onSuccessCallback,
					error:		onErrorCallback,
					count:		0
				});
			}	
		});
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KBank_getKonto
	*/
	this.getKonto = function getKonto(uid) {
		if(uid === undefined) {
			throw 'No UID submitted!';
		}
		
		var _db = Users.get(parseInt(uid, 10)).getPersistence();
		
		return {
			knuddel: parseFloat(_db.getNumber('KBank_knuddel', 0.00).toFixed(2)),
			buyin: parseFloat(_db.getNumber('KBank_buyin', 0.00).toFixed(2)),
			payout: parseFloat(_db.getNumber('KBank_payout', 0.00).toFixed(2)),
			taxes: parseFloat(_db.getNumber('KBank_taxes', 0.00).toFixed(2)),
			lock: (_db.getNumber('KBank_lock', 0))
		};
	};
	
	/*
		@docs	TODO
	*/
	this.resetKonto = function resetKonto(uid) {
		if(uid === undefined) {
			return;
		}
		
		var _db = Users.get(parseInt(uid, 10)).getPersistence();
		
		_db.deleteNumber('KBank_knuddel');
		_db.deleteNumber('KBank_buyin');
		_db.deleteNumber('KBank_payout');
		_db.deleteNumber('KBank_taxes');
		_db.deleteNumber('KBank_lock');
		
		if(updateCallback) {
			updateCallback(Users.get(parseInt(uid, 10)), this.getKn(uid));
		}
	};

	/*
		@docs	http://www.mychannel-apps.de/documentation/KBank_setKn
	*/
	this.setKn = function setKn(uid, kn) {
		if(uid === undefined) {
			throw 'No UID submitted!';
		}
		
		if(kn === undefined) {
			throw 'No UID submitted!';
		}
		
		if(kn < 0.00) {
			return false;
		}
		
		var _db = Users.get(parseInt(uid, 10)).getPersistence();
		_db.setNumber('KBank_knuddel', kn);
		
		if(updateCallback) {
			updateCallback(Users.get(parseInt(uid, 10)), this.getKn(uid));
		}
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KBank_addKn
	*/
	this.addKn = function addKn(uid, kn) {
		if(uid === undefined) {
			throw 'No UID submitted!';
		}
		
		if(kn === undefined) {
			throw 'No UID submitted!';
		}
		
		if(kn <= 0.00) {
			return false;
		}
		
		var _db = Users.get(parseInt(uid, 10)).getPersistence();
		_db.addNumber('KBank_knuddel', kn);
		
		if(updateCallback) {
			updateCallback(Users.get(parseInt(uid, 10)), this.getKn(uid));
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
			throw 'No UID submitted!';
		}
		
		if(kn === undefined) {
			throw 'No KN submitted!';
		}
	
		if(kn <= 0.00) {
			return false;
		}
		
		if(kn > this.getKn(uid)) {
			return false;
		}

		var _db = Users.get(parseInt(uid, 10)).getPersistence();		
		_db.addNumber('KBank_knuddel', -kn);
		
		if(updateCallback) {
			updateCallback(Users.get(parseInt(uid, 10)), this.getKn(uid));
		}
		
		return true;
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KBank_payout
	*/
	this.payout = function payout(uid, kn, reason) {
		if(uid === undefined) {
			throw 'No UID submitted!';
		}
		
		if(kn === undefined) {
			throw 'No UID submitted!';
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
		
		var _user = Users.get(parseInt(uid, 10));
		var _db = _user.getPersistence();
		_db.addNumber('KBank_knuddel', -kn);
		_db.addNumber('KBank_payout', kn);
		Bot.knuddel(_user, kn, reason);
		
		if(updateCallback) {
			updateCallback(Users.get(parseInt(uid, 10)), this.getKn(uid));
		}
		
		return true;
	};

	/*
		@docs	http://www.mychannel-apps.de/documentation/KBank_payin
	*/
	this.payin = function payin(uid, kn) {
		if(uid === undefined) {
			throw 'No UID submitted!';
		}
		
		if(kn === undefined) {
			throw 'No Knuddel submitted!';
		}

		if(kn <= 0.00) {
			throw 'KnNullOrNeg!';
		}
		
		var _db = Users.get(parseInt(uid, 10)).getPersistence();
		_db.addNumber('KBank_knuddel', kn);
		_db.addNumber('KBank_buyin', kn);
		
		if(updateCallback) {
			updateCallback(Users.get(parseInt(uid, 10)), this.getKn(uid));
		}
		
		return true;
	};
	
	/*
		@docs	TODO
	*/
	this.isLocked = function isLocked(uid) {
		var _db = Users.get(parseInt(uid, 10)).getPersistence();
		return (_db.getNumber('KBank_lock', 0));
	};
	
	/*
		@docs	TODO
	*/
	this.setLock = function setLock(uid) {
		var _db = Users.get(parseInt(uid, 10)).getPersistence();
		_db.setNumber('KBank_lock', 1);
	};
	
	/*
		@docs	TODO
	*/
	this.unLock = function unLock(uid) {
		var _db = Users.get(parseInt(uid, 10)).getPersistence();
		_db.deleteNumber('KBank_lock');		
	};
	
	/*
		@docs	http://www.mychannel-apps.de/documentation/KBank_getUsers
	*/
	this.getUsers = function getUsers(callback) {
		if(typeof callback !== 'function') {
			Logger.error('KBank.getUsers() is DEPRECATED, use it like this KBank.getUsers(function(userIds, total){ });');
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
			payout: parseFloat(DB.sum('KBank_payout')),
			taxes: parseFloat(DB.sum('KBank_taxes')),
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
			_db = Users.get(parseInt(uid, 10)).getPersistence();
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