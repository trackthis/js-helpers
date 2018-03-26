module.exports = function flatten(obj, prefix) {
  var output = {};
  prefix = prefix || '';
  Object.keys(obj).forEach(function (key) {
    var compositeKey = prefix + key;
    switch (typeof obj[key]) {
      case 'string':
      case 'number':
        output[compositeKey] = obj[key];
        break;
      case 'object':
        output[compositeKey] = JSON.stringify(obj[key]);
        Object.assign(output,flatten(obj[key],compositeKey+'.'));
        break;
      default:
        // Do nothing
        break;
    }
  });
  return output;
};
