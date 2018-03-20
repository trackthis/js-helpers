if (!Array.prototype.intersect) {
  Object.defineProperty(Array.prototype, 'intersect', {
    value : function (matches) {
      return this.filter(function (entry) {
        return matches.indexOf(entry) !== -1;
      });
    }
  });
}
