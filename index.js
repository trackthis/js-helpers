module.exports = function (opts) {
  opts = ( 'object' === typeof opts ) ? ( opts || {} ) : {};


  var helpers = {
    libs: {
      array_fill: 'array_fill',
      intersect: 'array_intersect',
      qsort: 'array_qsort',
      unique: 'array_unique',
      format: 'string_format',
      fs: 'fs',
      hashCode: 'string_hashcode',
      pipe: 'string_pipe',
      flatten: 'object_flatten',
      watch: 'object_watch',
      get: 'get_deep',
      set: 'set_deep'
    }
  };

  helpers.load = function(opts) {
    var toLoad = this.libs;
    for (var key in toLoad) {
      if (opts.omit && opts.omit.includes(key)) {
        delete toLoad[key];
      } else {
        if(opts.conf && 'object' === typeof opts.conf && opts.conf.key == key) {
          toLoad[key] = require('./lib/' + toLoad[key])(opts.conf);
        }
        toLoad[key] = require('./lib/' + toLoad[key]);
      }
    }
    return toLoad;
  };

  return helpers.load(opts);
};
