var path   = require('path'),
    assert = require('assert');

// Force setting the polyfill
process.env.TEST = 'module.exports.get';

// Include the get_deep helper
var get = require('../lib/get_deep');

var Mocha = global.Mocha || require('mocha');
var Test  = Mocha.Test;
var Suite = Mocha.Suite;
var mocha = global.mocha || new Mocha();
var suite = Suite.create(mocha.suite, 'Verifying module.exports.set');

suite.timeout(5000);

suite.addTest(new Test('Fetch non-existing target by string key', function () {
  assert.equal(typeof get({}, "non.existing.target"),'undefined');
}));

suite.addTest(new Test('Fetch non-existing target by array key', function () {
  assert.equal(typeof get({}, ["non","existing","target"]),'undefined');
}));

suite.addTest(new Test('Fetch string target by string key', function () {
  assert.equal(typeof get({existing:{target:'str'}}, "existing.target"),'string');
}));

suite.addTest(new Test('Fetch string target by array key', function () {
  assert.equal(typeof get({existing:{target:'str'}}, ["existing","target"]),'string');
}));

suite.addTest(new Test('Fetch using invalid key', function () {
  assert.equal(typeof get({existing:{target:'str'}}, false),'undefined');
}));

// Let's start testing
mocha.run();
