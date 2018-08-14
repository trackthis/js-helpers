module.exports = function (opts) {
  opts = opts || {};

  require('./lib/array_fill');
  require('./lib/array_intersect');
  require('./lib/array_qsort');
  require('./lib/array_unique');
  require('./lib/fs_scandir');
  require('./lib/object_watch');
  require('./lib/string_format');
  require('./lib/string_hashcode');

  // skip prototype pollution of methods used by browserify
  if (typeof opts.build == 'undefined' || opts.build == false) {
    require('./lib/string_pipe');
  }
  
  return {
    flatten: require('./lib/flatten'),
    get: require('./lib/get_deep'),
    set: require('./lib/set_deep')
  };
};
