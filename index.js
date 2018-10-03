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
};
