if ((!Array.prototype.intersect) || (('object' === typeof process) && process.env && process.env.TEST === 'Array.prototype.intersect')) {
  Object.defineProperty(Array.prototype, 'intersect', {
    value : function (matches) {
      return this.filter(function (entry) {
        return matches.indexOf(entry) !== -1;
      });
    }
  });
}
module.exports.intersect = Array.prototype.intersect;