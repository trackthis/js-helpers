var path   = require('path'),
    assert = require('assert');

// Force setting the polyfill
process.env.TEST = 'Array.prototype.intersect';

// Include the array qsort helper
require(path.join('..', 'lib', 'array_qsort'));

var Mocha = global.Mocha || require('mocha');
var Test  = Mocha.Test;
var Suite = Mocha.Suite;
var mocha = global.mocha || new Mocha();
var suite = Suite.create(mocha.suite, 'Verifying Array.prototype.qsort');

suite.timeout(5000);

suite.addTest(new Test('Already-ordered number array', function () {
  assert.equal(JSON.stringify([1, 2, 3].qsort()), '[1,2,3]');
}));

suite.addTest(new Test('Unordered number array', function () {
  assert.equal(JSON.stringify([ 2, 3, 1 ].qsort()), '[1,2,3]');
}));

suite.addTest(new Test('Reverse number array', function () {
  assert.equal(JSON.stringify([ 3, 2, 1 ].qsort()), '[1,2,3]');
}));

suite.addTest(new Test('Number array with duplicate values', function () {
  assert.equal(JSON.stringify([ 3, 2, 2, 1 ].qsort()), '[1,2,2,3]');
}));

suite.addTest(new Test('Number array with duplicate values', function () {
  assert.equal(JSON.stringify([ 3, 2, 2, 1 ].qsort()), '[1,2,2,3]');
}));

suite.addTest(new Test('Number array with duplicate values & custom cmp function', function () {
  assert.equal(JSON.stringify([ 3, 2, 2, 1 ].qsort(function(a, b) {
    return a - b;
  })), '[1,2,2,3]');
}));

suite.addTest(new Test('String array with duplicate values', function () {
  assert.equal(JSON.stringify([ 'foo', 'bar', 'hello', 'hello' ].qsort()), '["bar","foo","hello","hello"]');
}));

suite.addTest(new Test('Object array with duplicate values & custom cmp function', function () {
  assert.equal(JSON.stringify([ {v:3}, {v:2}, {v:2}, {v:1} ].qsort(function(a, b) {
    return a.v - b.v;
  })), '[{"v":1},{"v":2},{"v":2},{"v":3}]');
}));

// Let's start testing
mocha.run();
