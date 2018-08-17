if ((!String.prototype.hashCode) || (('object' === typeof process) && process.env && process.env.TEST === 'String.prototype.hashCode')) {
  Object.defineProperty(String.prototype, 'hashCode', {
    value : function () {
      var i, char, hash = 0;
      if (this.length === 0) return hash;
      for (i = 0; i < this.length; i++) {
        char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
      }
      return hash;
    }
  });
}
module.exports.hashCode = String.prototype.hashCode;
