if ((!Array.prototype.unique) || (('object' === typeof process) && process.env && process.env.TEST === 'Array.prototype.unique')) {
  Object.defineProperty(Array.prototype, 'unique', {
    value: function () {
      var org = this;
      return this.filter(function (entry, index) {
        return org.indexOf(entry) === index;
      });
    }
  });
}
