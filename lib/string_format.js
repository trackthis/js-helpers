Object.defineProperty(String.prototype, 'format', {
  value: function (data) {
    var getDeep = require('./get_deep');

    if ( typeof data === 'object' ) {
      return this.replace(/{([\w\d\-_]+?(\.[\w\d\-_\.]+?)?)}/g, function ( match, key ) {
        var output = getDeep(data,key);
        if ( 'undefined' === typeof output ) return '';
        if ( null        ===        output ) return 'NULL';
        if ( true        ===        output ) return 'true';
        if ( false       ===        output ) return 'false';
        if ( 'object'    === typeof output ) return JSON.stringify(output);
        return output;
      });
    } else {
      var args = arguments;
      return this.replace(/{(\d+?)}/g, function ( match, number ) {
        return args[ number ] || match;
      });
    }
  }
});
