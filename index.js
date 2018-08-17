module.exports = function (opts) {
  opts = ( 'object' === typeof opts ) ? ( opts || {} ) : {};

  // load
  var fs = ('fs-extra');

  var helpers = {
    libs: [
      'array_fill',
      'array_intersect',
      'array_qsort',
      'array_unique',
      'fs_scandir',
      'string_format',
      'string_hashcode',
      'string_pipe',
      'object_flatten',
      'object_watch',
      'get_deep',
      'set_deep'
    ]
  };

  helpers.load = function(opts) {
    var toLoad = this.libs;
    if(opts.omit && opts.omit.length > 0) {
      toLoad = this.libs.filter((lib) => !opts.omit.includes(lib));
    }
    return toLoad.map(lib => require('./lib/'+lib)) ;
  };

  return helpers.load(opts);
};

