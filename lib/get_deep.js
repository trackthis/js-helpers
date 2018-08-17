module.exports = function get( subject, keys ) {
  if ( 'string' === typeof keys ) {
    keys = keys.split('.');
  }
  if ( !Array.isArray(keys) ) {
    return undefined;
  }
  keys.forEach(function ( key ) {
    if ( 'undefined' === typeof subject ) {
      return;
    }
    if ( subject.hasOwnProperty(key) ) {
      subject = subject[key];
    } else {
      subject = undefined;
    }
  });
  return subject;
};
