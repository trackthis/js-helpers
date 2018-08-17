if (!Array.prototype.unique) {
  Object.defineProperty(Array.prototype, 'unique', {
    value: function () {
      var org = this;
      return this.filter(function (entry, index) {
        return org.indexOf(entry) === index;
      });
    }
  });
}
