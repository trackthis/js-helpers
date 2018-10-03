module.exports = function( obj, key, value, separator ) {
  separator = separator || '.';
  if ( 'string' !== typeof separator ) {
    throw new TypeError('Separator is not a string');
  }
  if ( 'string' === typeof key ) {
    key = key.split(separator);
  }
  if (!Array.isArray(key)) {
    return;
  }
  let token;
  while(key.length) {
    token = key.shift();
    if ( key.length ) {
      obj = obj[token] = obj[token] || {};
    } else {
      if ( obj[token] && 'object' === typeof value ) {
        Object.assign(obj[token], value);
      } else {
        obj[token] = value;
      }
    }
  }
  return this;
};
