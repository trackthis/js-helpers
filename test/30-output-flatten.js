var path   = require('path'),
    assert = require('assert');

// Force setting the polyfill
process.env.TEST = 'module.exports.flatten';

// Include the flatten helper
var flatten = require('../lib/object_flatten');

var Mocha = global.Mocha || require('mocha');
var Test  = Mocha.Test;
var Suite = Mocha.Suite;
var mocha = global.mocha || new Mocha();
var suite = Suite.create(mocha.suite, 'Verifying module.exports.flatten');

suite.timeout(5000);

suite.addTest(new Test('Start with an empty object', function () {
  assert.equal(JSON.stringify(flatten({})), '{}');
}));

suite.addTest(new Test('Verify an already-flat object', function () {
  assert.equal(JSON.stringify(flatten({foo:'bar',hello:'world'})), '{"foo":"bar","hello":"world"}');
}));

suite.addTest(new Test('Flatten a deep object', function () {
  assert.equal(JSON.stringify(flatten({header:{from:"some1@example.com"}})), '{"header.from":"some1@example.com"}');
}));

suite.addTest(new Test('Flatten a deep object, including json of objects', function () {
  assert.equal(JSON.stringify(flatten({header:{from:"some1@example.com"}}, true)), '{"header":"{\\"from\\":\\"some1@example.com\\"}","header.from":"some1@example.com"}');
}));

suite.addTest(new Test('Flatten a deep object containing a function', function () {
  assert.equal(JSON.stringify(flatten({header: console.log})), '{}');
  assert.equal(typeof flatten({header: { log: console.log }})['header.log'], 'function');
}));

// Let's start testing
mocha.run();
