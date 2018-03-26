var path   = require('path'),
    assert = require('assert');

// Force setting the polyfill
process.env.TEST = 'Array.prototype.intersect';

// Include the array set helper
var set = require(path.join('..', 'lib', 'string_format'));

var Mocha = global.Mocha || require('mocha');
var Test  = Mocha.Test;
var Suite = Mocha.Suite;
var mocha = global.mocha || new Mocha();
var suite = Suite.create(mocha.suite, 'Verifying String.prototype.format');
var ref   = {};

suite.timeout(5000);

suite.addTest(new Test('Single find-replace', function () {
  assert.equal('{str}'.format({str:'{}'}),'{}');
}));

suite.addTest(new Test('Non-existing tag becomes empty', function () {
  assert.equal('{str}'.format({}),'');
}));

suite.addTest(new Test('Replacing deep tag', function () {
  assert.equal('{mail.header.from}'.format({mail:{header:{from:"some1@example.com"}}}),'some1@example.com');
}));

suite.addTest(new Test('Output json when object', function () {
  assert.equal('{mail.header}'.format({mail:{header:{from:"some1@example.com"}}}),'{"from":"some1@example.com"}');
}));

suite.addTest(new Test('Replacing multiple tags', function () {
  assert.equal('{greeting} {subject}!'.format({greeting:'Hello',subject:'world'}),'Hello world!');
}));

// Let's start testing
mocha.run();
