module.exports = function( obj, key, value, separator ) {
  separator = separator || '.';
  if ( 'string' === typeof key ) {
    key = key.split(separator);
  }
  if (!Array.isArray(key)) {
    return;
  }
  var token;
  while(key.length) {
    token = key.shift();
    if ( key.length ) {
      obj = obj[token] = obj[token] || {};
    } else {
      if ( obj[token] && 'object' === typeof value ) {
        try {
          if ( require.resolve('extend') ) {
            require('extend')( obj[token], value );
          } else {
            Object.assign(obj[token], value);
          }
        } catch(e) {
          Object.assign(obj[token], value);
        }
      } else {
        obj[token] = value;
      }
    }
  }
  return this;
};
