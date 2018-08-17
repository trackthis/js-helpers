module.exports = function (opts) {
  opts = ( 'object' === typeof opts ) ? ( opts || {} ) : {};

  require('./lib/array_fill');
  require('./lib/array_intersect');
  require('./lib/array_qsort');
  require('./lib/array_unique');
  require('./lib/fs_scandir');

  require('./lib/string_format');
  require('./lib/string_hashcode');

  // skip prototype pollution of methods used by browserify
  if (!opts.build) {
    require('./lib/string_pipe');
  }
  if (!opts.test) {
    require('./lib/object_watch');
  }

  return {
      flatten   : require('./lib/flatten'),
      get       : require('./lib/get_deep'),
      set       : require('./lib/set_deep')
    };
};

module.exports.fs = require('./lib/fs_scandir');
