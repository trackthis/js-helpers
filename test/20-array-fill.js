var path   = require('path'),
    assert = require('assert');

// Force setting the polyfill
process.env.TEST = 'Array.prototype.fill';

// Include all helpers (to ensure code coverage number is reliable)
require(path.join('..','index'));

var Mocha = global.Mocha || require('mocha');
var Test  = Mocha.Test;
var Suite = Mocha.Suite;
var mocha = global.mocha || new Mocha();
var suite = Suite.create(mocha.suite,'Verifying Array.prototype.fill');

// Tests copied from the MDN examples
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill

suite.timeout(5000);

suite.addTest(new Test('All elements in the array', function() {
  assert.equal(JSON.stringify([1,2,3].fill(4)), '[4,4,4]');
}));

suite.addTest(new Test('Starting at defined index', function() {
  assert.equal(JSON.stringify([1,2,3].fill(4,1)), '[1,4,4]');
}));

suite.addTest(new Test('Single index', function() {
  assert.equal(JSON.stringify([1,2,3].fill(4,1,2)), '[1,4,3]');
}));

suite.addTest(new Test('Matching start & stop indexes', function() {
  assert.equal(JSON.stringify([1,2,3].fill(4,1,1)), '[1,2,3]');
}));

suite.addTest(new Test('Matching out-of-boundary start & stop indexes', function() {
  assert.equal(JSON.stringify([1,2,3].fill(4,3,3)), '[1,2,3]');
}));

suite.addTest(new Test('Matching out-of-boundary start & stop indexes', function() {
  assert.equal(JSON.stringify([1,2,3].fill(4,3,3)), '[1,2,3]');
}));

suite.addTest(new Test('Negative start & stop indexes', function() {
  assert.equal(JSON.stringify([1,2,3].fill(4,-3,-2)), '[4,2,3]');
}));

suite.addTest(new Test('NaN indexes', function() {
  assert.equal(JSON.stringify([1,2,3].fill(4,NaN,NaN)), '[1,2,3]');
}));

suite.addTest(new Test('Out-of-bounds index range', function() {
  assert.equal(JSON.stringify([1,2,3].fill(4,3,5)), '[1,2,3]');
}));

suite.addTest(new Test('Generate filled array', function() {
  assert.equal(JSON.stringify(Array(3).fill(4)), '[4,4,4]');
}));

suite.addTest(new Test('Called on object', function() {
  assert.equal(JSON.stringify([].fill.call({ length: 3 }, 4)),'{"0":4,"1":4,"2":4,"length":3}');
}));

suite.addTest(new Test('Maintaining references', function() {
  var ref = {},
      arr = Array(3).fill(ref);
  assert.equal(JSON.stringify(arr), '[{},{},{}]');
  ref.hi = "hi";
  assert.equal(JSON.stringify(arr), '[{"hi":"hi"},{"hi":"hi"},{"hi":"hi"}]');
  arr[0].hi = "bye";
  assert.equal(JSON.stringify(arr), '[{"hi":"bye"},{"hi":"bye"},{"hi":"bye"}]');
}));

// Let's start testing
mocha.run();
