// Origin: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
if ((!Array.prototype.fill) || (('object' === typeof process) && process.env && process.env.TEST === 'Array.prototype.fill')) {
  Object.defineProperty(Array.prototype, 'fill', {

    /**
     *
     * @param {*}      value
     * @param {number} [start]
     * @param {number} [end]
     *
     * @returns {Array}
     */
    value : function (value, start, end) {

      // Steps 1-2.
      if (this == null) {
        throw new TypeError('this is null or not defined');
      }

      var O = Object(this);

      // Steps 3-5.
      var len = O.length >>> 0;

      // Steps 6-7.
      var relativeStart = (start || 0) >> 0;

      // Step 8.
      var k = relativeStart < 0 ?
              Math.max(len + relativeStart, 0) :
              Math.min(relativeStart, len);

      // Steps 9-10.
      var relativeEnd = end === undefined ?
                        len : end >> 0;

      // Step 11.
      var final = relativeEnd < 0 ?
                  Math.max(len + relativeEnd, 0) :
                  Math.min(relativeEnd, len);

      // Step 12.
      while (k < final) {
        O[k] = value;
        k++;
      }

      // Step 13.
      return O;
    }
  });
}
module.exports.array_fill = Array.prototype.fill;