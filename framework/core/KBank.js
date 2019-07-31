/**
	The MIT License (MIT)

	Copyright (c) 2014 UserApps.de

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
	@docs		http://www.userapps.de/documentation/core/bank
*/

var KBank = (new function KBank() {
	this.javaClassName = 'KBank';
	var instance = this;
	var updateCallback = null;
	var payoutTaxRate = 0;
	
	/*
		@docs	TODO
	*/
	this.onKontoUpdate = function(call) {
		updateCallback = call;
	};
	
	/*
		@docs	TODO
	*/
	this.triggerKontoUpdate = function(uid) {
		if(updateCallback) {
			updateCallback(Users.get(parseInt(uid, 10)), this.getKn(uid));
		}
	};
	
	/*
		@docs	TODO
	*/
	this.setPayoutTaxRate = function setPayoutTaxRate(taxRate) {
		if(taxRate === undefined) {
			throw 'No taxRate submitted!';
		}
		
		if(isNaN(parseFloat(taxRate))) {
			throw 'taxRate "'+taxRate+'" is non Numeric';
			return false;
		}
		
		taxRate = parseFloat(taxRate.toFixed(2));

		if(taxRate>100) {
			Logger.error('taxRate "'+taxRate+'" is higher as 100');
			return false;
		}
		
		payoutTaxRate = taxRate;
		return true;
	};
	
	/*
		@docs	TODO
	*/
	this.getPayoutTaxRate = function getPayoutTaxRate() {
		return payoutTaxRate;
	};
	
	/*
		@docs	http://www.userapps.de/documentation/KBank_getKn
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
		
		var _user = Users.get(parseInt(uid, 10));
		return parseFloat((_user.getPersistence().getNumber('KBank_knuddel', 0.00)+_user.getKnuddelAccount().getKnuddelAmount().asNumber()).toFixed(2));
	};
	
	/*
		@docs	TODO
	*/
	this.getAccountKn = function getTotalKn(uid) {
		if(uid === undefined) {
			throw 'No UID submitted!';
		}
		
		var _user = Users.get(parseInt(uid, 10));
		
		return parseFloat(_user.getKnuddelAccount().getKnuddelAmount().asNumber().toFixed(2));
	};
	
	/*
		@docs	TODO
	*/
	this.reqKn = function reqKn(uid, kn, callSuccess, callError, reason) {
		if(uid === undefined) {
			throw 'No UID submitted!';
		}
		
		var user = Users.get(parseInt(uid, 10));
		
		if(!isTypeOf(user) == 'User') {
			throw 'No User-Object found!';
		}
		
		if(kn === undefined) {
			throw 'No Knuddel submitted!';
		}

		if(callSuccess === undefined || typeof(callSuccess) !== 'function') {
			throw 'no success Callback';
		}

		if(callError === undefined || typeof(callError) !== 'function') {
			throw 'no error Callback';
		}
		
		try {
			kn = parseFloat(kn.toFixed(2));
		} catch(e) {
			throw e.message;
		}
				
		if(kn <= 0.00) {
			callError(user, 'KnNullOrNeg');
			return false;
		}
	
		if(kn <= this.getKn(uid)) {
			if(this.subKn(uid, kn)) {
				callSuccess(user, kn);
				return true;
			} else {
				callError(user, 'CantGetKn');
				return false;
			}
		}
		
		var knAcc = user.getKnuddelAccount();
		var diffKn = parseFloat((kn-this.getKn(uid)).toFixed(2));
		
		if(diffKn < 0.01) {
			diffKn = 0.01;
		}
		
		try {
			var requestKn = new KnuddelAmount(diffKn);
		} catch(e) {
			callError(user, 'KnValueToHigh');
		}

		if(!knAcc.hasEnough(requestKn)) {
			callError(user, 'KnNotEnough');
			return false;
		}
		
		try {
			knAcc.use(requestKn, reason || 'Einzahlung', {
				transferReason: reason || 'Einzahlung',
				onError: function KnOnError() {
					callError(user, 'KnuddelAccountError');
				},
				onSuccess: function KnOnSuccess() {
					if(instance.subKn(uid, kn)) {
						callSuccess(user, kn);
					} else {
						setTimeout(function timeOutCheck() {
							if(instance.subKn(uid, kn)) {
								callSuccess(user, kn);
							} else {
								callError(user, 'NoKnReceived');
							}
						}, 500);
					}
				}	
			});
		} catch(e) {
			callError(user, 'KnuddelAccountError');
			Logger.error(e.name + ' : ' + e.message);
		}
	};
	
	/*
		@docs	http://www.userapps.de/documentation/KBank_getKonto
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
		_db.deleteNumber('KBank_lock');
		
		if(updateCallback) {
			updateCallback(Users.get(parseInt(uid, 10)), this.getKn(uid));
		}
	};

	/*
		@docs	http://www.userapps.de/documentation/KBank_setKn
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
		@docs	http://www.userapps.de/documentation/KBank_addKn
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
		@docs	http://www.userapps.de/documentation/KBank_delKn
	*/
	this.delKn = function delKn(uid, kn) {
		Logger.info('KBank.delKn(uid, kn) is DEPRECATED, use KBank.subKn(uid, kn)');
		return this.subKn(uid, kn);
	};
	
	/*
		@docs	http://www.userapps.de/documentation/KBank_subKn
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
		@docs	http://www.userapps.de/documentation/KBank_payout
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

		if(payoutTaxRate) {
			Bot.knuddel(_user, kn/100*(100-payoutTaxRate), reason);
		} else {
			Bot.knuddel(_user, kn, reason);
		}
		
		if(updateCallback) {
			updateCallback(Users.get(parseInt(uid, 10)), this.getKn(uid));
		}
		
		return true;
	};
	
	/*
		@docs	TODO
	*/
	this.payToAccount = function payToAccount(uid, kn, reason) {
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
		
		if(payoutTaxRate) {
			Bot.knuddel(_user.getKnuddelAccount(), kn/100*(100-payoutTaxRate), reason, KnuddelTransferDisplayType.Silent);
		} else {
			Bot.knuddel(_user.getKnuddelAccount(), kn, reason, KnuddelTransferDisplayType.Silent);
		}

		if(updateCallback) {
			updateCallback(Users.get(parseInt(uid, 10)), this.getKn(uid));
		}
		
		return true;
	};
	
	/*
		@docs	http://www.userapps.de/documentation/KBank_payin
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
		@docs	http://www.userapps.de/documentation/KBank_getUsers
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
		@docs	http://www.userapps.de/documentation/KBank_getStats
	*/
	this.getStats = function getStats() {
		return {
			users: DB.count('KBank_knuddel'),
			knusers: DB.count('KBank_knuddel', 0.01),
			knuddel: parseFloat(DB.sum('KBank_knuddel')),
			buyin: parseFloat(DB.sum('KBank_buyin')),
			payout: parseFloat(DB.sum('KBank_payout')),
		};
	};

	/*
		@docs	http://www.userapps.de/documentation/KBank_getTransit
	*/
	this.getTransit = function getTransit() {
		return parseFloat(DB.sum('KBank_knuddel'));
	};

	/*
		@docs	http://www.userapps.de/documentation/KBank_getTransit
	*/
	this.getMaxPayout = function getTransit() {
		if(payoutTaxRate) {
			return parseFloat(DB.sum('KBank_knuddel')/100*(100-payoutTaxRate));
		}
		return this.getTransit();
	};
	
	/*
		@docs	http://www.userapps.de/documentation/KBank_toString
	*/
	this.toString = function toString() {
		return '[KFramework KBank]';
	};
	
	/*
		@ToDo
		@docs	http://www.userapps.de/documentation/KBank_dataMigration
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
			Logger.info('KBank cant migrate all data at once ('+migrated.size()+' of '+migrate.size()+' finish). Please restart this App to migrate the last '+(migrate.size()-migrated.size())+' KBank Entrys');
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
		@docs	http://www.userapps.de/documentation/KBank_saveData
	*/
	this.saveData = function saveData() {
		Logger.info('KBank.saveData() is DEPRECATED, you dont need this all any more!');
	};

	/*
		@docs	http://www.userapps.de/documentation/KBank_resetData
	*/
	this.resetData = function resetData() {
		Logger.info('KBank.resetData() is DEPRECATED, you dont need this all any more!');
	};
	
	/*
		@docs	http://www.userapps.de/documentation/KBank_fixData
	*/
	this.fixData = function fixData() {
		Logger.info('KBank.fixData() is DEPRECATED, you dont need this all any more!');
	};
	
	/*
		@docs	http://www.userapps.de/documentation/KBank_cleanData
	*/
	this.cleanData = function cleanData() {
		Logger.info('KBank.cleanData() is DEPRECATED, you dont need this all any more!');
	};
}());