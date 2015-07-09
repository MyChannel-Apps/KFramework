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
	
	@author		Christoph Kühl <djchrisnet>, Adrian Preuß <Bizarrus>
	@docs		TODO
*/

/*
	@docs	TODO
*/
if (!DiceEvent.prototype.getTotal) {
  Object.defineProperty(DiceEvent.prototype, 'getTotal', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function getTotal() {
		return this.getDiceResult().totalSum();
    }
  });
}

/*
	@docs	TODO
*/
if (!DiceEvent.prototype.checkUser) {
  Object.defineProperty(DiceEvent.prototype, 'checkUser', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function checkUser(user) {
		return this.getUser().equals(user);
    }
  });
}

/*
	@docs	TODO
*/
if (!DiceEvent.prototype.checkConf) {
  Object.defineProperty(DiceEvent.prototype, 'checkConf', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function checkConf(conf) {
		return this.getDiceResult().getDiceConfiguration().equals(conf);
    }
  });
}

/*
	@docs	TODO
*/
if (!DiceConfiguration.prototype.getFakeDiceEvent) {
  Object.defineProperty(DiceConfiguration.prototype, 'getFakeDiceEvent', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function getFakeDiceEvent(user) {
		var _conf = this;
		var _singleResults = [];
		var _totalSum = 0;
 
		function FakeSingleDiceResult(dice, values) {
			var sum = 0;
			values.each(function(val) {
				sum += val;
			});
			
			this.getDice = function getDice() { return dice; };
			this.valuesRolled = function valuesRolled() { return values; };
			this.sum = function sum() { return sum; };
		}
		
		var confdices = _conf.getDices();
		confdices.sort(function(a, b) {
            return a.getNumerOfSides() - b.getNumerOfSides();
        });

		var dices = [];
		var results = [];
		var count = 0;
		confdices.each(function(dice){
            var curValues = [];
			var curDices = [];

			if(dice.getAmount() == 1) {
				dices.push('W'+dice.getNumerOfSides());
				count++;				
			} else {
				dices.push(dice.getAmount()+'W'+dice.getNumerOfSides());
				count += dice.getAmount();
			}
 
            for(var w = 0; w < dice.getAmount(); w++) {
				if(_conf.isUsingOpenThrow()) {
					var tmpVal = 0;
					var diceo = [];
					do {
						tmpVal = RandomOperations.nextInt(dice.getNumerOfSides())+1;
						curValues.push(tmpVal);
						diceo.push(tmpVal);
						_totalSum += tmpVal;
					} while(tmpVal == dice.getNumerOfSides())
					
					curDices.push(diceo.join('> '));
				} else {
					var tmpVal = RandomOperations.nextInt(dice.getNumerOfSides())+1;
					curValues.push(tmpVal);
					curDices.push(tmpVal);
					_totalSum += tmpVal;
				}
            }
			results.push(curDices.join(', '));
            _singleResults.push(new FakeSingleDiceResult(dice, curValues));
        });

		var infoLine = ((!_conf.isUsingPrivateThrow()) ? '°BB°> ' : '')+'_'+user.getProfileLink()+'_ rollt '+((count > 1) ? 'die' : 'einen')+' Würfel'+((_conf.isUsingOpenThrow()) ? ' (offener Wurf)' : '')+'...';
		var resultLine = dices.join(' + ')+': '+results.join(' + ')+' = _'+_totalSum+'_';
		
		return (new function FakeDiceEvent() {
			this.checkConf = function checkConf(conf) { return this.getDiceResult().getDiceConfiguration().equals(conf); };
			this.checkUser = function checkUser(user) { return this.getUser().equals(user); };
			this.getDiceResult = function getDiceResult() { 
				return (new function FakeDiceResult() {
					this.getDiceConfiguration = function getDiceConfiguration() { return _conf; };
					this.getSingleDiceResults = function getSingleDiceResults() { return _singleResults; };
					this.totalSum = function totalSum() { return _totalSum; };
				});
			};
			this.getResultLine = function getText() { return resultLine; };			
			this.getText = function getText() { return infoLine + '°#°' + resultLine; };
			this.getInfoLine = function getTopLine() { return infoLine };
			this.getTotal = function getTotal() { return this.getDiceResult().totalSum(); };
			this.getUser = function getUser() { return user; };
		});
    }
  });
};