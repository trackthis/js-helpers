module.exports = function flatten(obj, addJson, prefix) {
  var output = {};
  prefix = prefix || '';
  Object.keys(obj).forEach(function (key) {
    var compositeKey = prefix + key;
    switch (typeof obj[key]) {
      case 'string':
      case 'number':
      case 'function':
        output[compositeKey] = obj[key];
        break;
      case 'object':
        if ( addJson ) {
          output[compositeKey] = JSON.stringify(obj[key]);
        }
        Object.assign(output,flatten(obj[key],addJson,compositeKey+'.'));
        break;
      default:
        // Do nothing
        break;
    }
  });
  return output;
};
