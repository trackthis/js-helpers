module.exports = function( options ) {
  options          = ( 'object' === typeof options ) ? ( options || {} ) : {};
  options.hygienic = options.hygienic || false;

  if (!hygienic) {
    require('./array.fill');
  }

  //
  // options.fs             = ('object'===typeof window) ? false : (options.fs || false);
  //
  // options.fix            = options.fix            || {};
  // options.fix.browserify = options.fix.browserify || false;
  // options.fix.mocha      = options.fix.mocha      || false;
  //
  // // String prototype extension
  // if(!options.hygienic) {
  //   require('./lib/string_format');
  //   require('./lib/string_hashcode');
  //   if(!options.fix.browserify) {
  //     require('./lib/string_pipe');
  //   }
  // }
  //
  // // Array prototype extension
  // if(!options.hygienic) {
  //   require('./lib/array_fill');
  //   require('./lib/array_intersect');
  //   require('./lib/array_qsort');
  //   require('./lib/array_unique');
  // }
  //
  // // Object prototype extension
  // if(!options.hygienic) {
  //   require('./lib/object_watch')( options.fix.mocha ||
  //     ((('undefined' !== typeof process) && process.env && ('string' === typeof process.env.DEBUG) && (!isNaN(process.env.DEBUG))) ? !!parseInt(process.env.DEBUG) : false));
  // }
  //
  // // Add fs.scandir
  // if(options.fs) {
  //   require('./lib/fs_scandir')(options.fs);
  // }
  //
  // return {
  //   flatten: require('./lib/object_flatten'),
  //   get    : require('./lib/get_deep'),
  //   set    : require('./lib/set_deep'),
  // };
};
