function stringVal( subject ) {
  if ( 'undefined' === typeof subject ) { return ''; }
  if ( null        ===        subject ) { return 'NULL'; }
  if ( true        ===        subject ) { return 'true'; }
  if ( false       ===        subject ) { return 'false'; }
  if ( 'object'    === typeof subject ) { return JSON.stringify(subject); }
  return subject;
}

if (!String.prototype.format) {
  Object.defineProperty(String.prototype, 'format', {
    value : function (data) {
      if (typeof data === 'object') {
        return this.replace(/{([\w\d\-_]+?(\.[\w\d\-_\.]+?)?)}/g, function (match, key) {
          return stringVal(require('./get_deep')(data,key));
        });
      } else {
        var args = arguments;
        return this.replace(/{(\d+?)}/g, function (match, number) {
          return stringVal(args[number]);
        });
      }
    }
  });
}
module.exports.format = String.prototype.format;