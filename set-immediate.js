(function() {
  let expo = false;
  expo = expo || ('object' === typeof global ? global : false);
  expo = expo || ('object' === typeof window ? window : false);

  if ( (!expo.setImmediate) || (('object' === typeof process) && process.env && process.env.TEST === 'setImmediate')) {

    expo.clearImmediate = expo.clearTimeout;
    expo.setImmediate   = function() {
      let args    = Array.prototype.slice.call(arguments),
          handler = args.shift();
      return setTimeout( function() {
        handler.apply(expo,args);
      }, 0);
    };

  }
})();
