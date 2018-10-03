// Origin: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
if ((!Array.prototype.flat) || (('object' === typeof process) && process.env && process.env.TEST === 'Array.prototype.flat')) {
  Object.defineProperty(Array.prototype, 'flat', {

    /**
     *
     * @param {number} depth
     *
     * @returns {Array}
     */
    value : function (depth = 1) {

      if (!this) {
        throw new TypeError('this is null or not defined');
      }

      return this.reduce(function( flat, item ) {
        return flat.concat( (Array.isArray(item) && depth>1) ? item.flat(depth-1) : item );
      }, []);
    }
  });
}
