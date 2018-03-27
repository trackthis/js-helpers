var path   = require('path'),
    assert = require('assert');

// Force setting the polyfill
process.env.TEST = 'Array.prototype.intersect';

// Include all helpers (to ensure code coverage number is reliable)
require(path.join('..', 'index'));

var Mocha = global.Mocha || require('mocha');
var Test  = Mocha.Test;
var Suite = Mocha.Suite;
var mocha = global.mocha || new Mocha();
var suite = Suite.create(mocha.suite, 'Verifying Array.prototype.intersect');

suite.timeout(5000);

suite.addTest(new Test('Intersect on number entities', function () {
  assert.equal(JSON.stringify([1, 2, 3].intersect([2, 3, 4])), '[2,3]');
}));

suite.addTest(new Test('Intersect on string entities', function () {
  assert.equal(JSON.stringify(["foo", "bar", "hello"].intersect(["hello", "foo", "world"])), '["foo","hello"]');
}));

// Let's start testing
mocha.run();
