var assert = require('assert');

// Force setting the polyfill
process.env.TEST = 'String.prototype.hashCode';

// Include Array.prototype.fill
require('../lib/string_hashcode');

var Mocha = global.Mocha || require('mocha');
var Test  = Mocha.Test;
var Suite = Mocha.Suite;
var mocha = global.mocha || new Mocha();
var suite = Suite.create(mocha.suite, 'Verifying String.prototype.hashCode');

suite.timeout(5000);

suite.addTest(new Test('"Hello"       ->    69609650', function () {
  assert.equal('Hello'.hashCode(),69609650);
}));

suite.addTest(new Test('"World"       ->    83766130', function () {
  assert.equal('World'.hashCode(),83766130);
}));

suite.addTest(new Test('"Hello World" ->  -862545276', function () {
  assert.equal('Hello World'.hashCode(),-862545276);
}));

suite.addTest(new Test('"foobar"      -> -1268878963', function () {
  assert.equal('foobar'.hashCode(),-1268878963);
}));

suite.addTest(new Test('""            ->           0', function () {
  assert.equal(''.hashCode(),0);
}));

// Let's start testing
mocha.run();
