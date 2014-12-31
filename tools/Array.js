if (!Array.prototype.each) {
  Object.defineProperty(Array.prototype, 'each', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function(callback) {
		 for (var index = 0; index < this.length; index++) {
			if (callback.apply(this[index], index) === false) {
				break;
			}
		}
    }
  });
}