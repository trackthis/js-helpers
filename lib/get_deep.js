module.exports = function getDeep( subject, keys ) {
  if ( 'string' === typeof keys ) {
    keys = keys.split('.');
  }
  if ( !Array.isArray(keys) ) {
    return null;
  }
  keys.forEach(function ( key ) {
    if ( subject.hasOwnProperty(key) ) {
      subject = subject[key];
    } else {
      subject = null;
    }
  });
  return subject;
};
