// Disabled
if ( process.env.MANUAL || false ) {


  var exec = require('child_process'),
      fs   = require('fs-extra'),
      path = require('path');

  // Defining globals
  global.approot = path.dirname(__dirname);
  global.co      = require('co');
  global.Promise = Promise || require('bluebird');

  // Load helpers
  require('../src/helper');

  co(function* () {
    var config = yield require(path.join(__dirname, '..', 'config'));

    // Fetch files to load
    var filename, files = (yield fs.scandir(__dirname)).filter(function (filename) {
      return (filename !== __filename);
    }).sort();

    var queue = Promise.resolve();

    files
      .forEach(function (filename) {
        queue = queue.then(function () {
          console.log(filename);
          return new Promise(function (resolve, reject) {

            // Run the file itself by default
            var args = [
              filename,
              [],
              {cwd : __dirname}
            ];

            // Some extensions might need to be called differently
            switch (filename.split('.').pop()) {
              case 'js':
                args[0] = 'node';
                args[1] = [filename];
                break;
              case 'sh':
                args[0] = 'bash';
                args[1] = [filename];
                break;
            }

            var child = exec.spawn.apply(null, args);
            child.stdout.on('data', function (data) {
              process.stdout.write(data);
            });
            child.stderr.on('data', function (data) {
              process.stderr.write(data);
            });
            child.on('close', function (code) {
              if ( code ) reject(code);
              resolve(code);
            });
          });
        });
      });

    return queue;
  });

}
