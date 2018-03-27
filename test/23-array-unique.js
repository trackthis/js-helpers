var path   = require('path'),
    assert = require('assert');

// Force setting the polyfill
process.env.TEST = 'Array.prototype.unique';

// Include Array.prototype.unique
require('../lib/array_unique');

var Mocha = global.Mocha || require('mocha');
var Test  = Mocha.Test;
var Suite = Mocha.Suite;
var mocha = global.mocha || new Mocha();
var suite = Suite.create(mocha.suite, 'Verifying Array.prototype.unique');

suite.timeout(5000);

suite.addTest(new Test('Already-unique array', function () {
  assert.equal(JSON.stringify([1, 2, 3].unique()), '[1,2,3]');
}));

suite.addTest(new Test('All duplicate array', function () {
  assert.equal(JSON.stringify([ 1, 1, 1 ].unique()), '[1]');
}));

suite.addTest(new Test('Single duplicate value', function () {
  assert.equal(JSON.stringify([ 3, 2, 2, 1 ].unique()), '[3,2,1]');
}));

// Let's start testing
mocha.run();
