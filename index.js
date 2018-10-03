module.exports = function (options) {
  options = ('object' === typeof options) ? (options || {}) : {};
  options = Object.assign({}, {
    hygienic  : false,
    polyfill  : true,
    extensions: false,
  }, options);

  // Polyfill  : pull the engine into standardized future
  // Extension : provide non-standard behavior

  // Loader function
  function load( available, toLoad ) {
    let loadList = available;
    if ('string' === typeof toLoad ) {
      loadList = [toLoad];
    }
    if (Array.isArray(toLoad)) {
      loadList = toLoad;
    }
    loadList.forEach(function( name ) {
      if ( available.indexOf(name) < 0 ) {
        return;
      }
      require('./'+name);
    });
  }

  // Define what we can load
  let polyfills  = [
        'array.fill',
        'array.flat',
        'array.includes',
      ],
      extensions = [
        'array.unique'
      ];

  // These change stuff in the engine
  // Allow the user to prevent that
  if (!options.hygienic) {
    if (options.polyfill) {
      load(polyfills,options.polyfill);
    }
    if (options.extensions) {
      load(extensions,options.extensions);
    }
  }

  // Safe to export
  return {
    get: require('./get'),
    set: require('./set'),
  }


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
