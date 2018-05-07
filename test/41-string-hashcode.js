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

// suite.addTest(new Test('Replacing deep tag', function () {
//   assert.equal('{mail.header.from}'.format({mail:{header:{from:"some1@example.com"}}}),'some1@example.com');
// }));
//
// suite.addTest(new Test('Output json when object', function () {
//   assert.equal('{mail.header}'.format({mail:{header:{from:"some1@example.com"}}}),'{"from":"some1@example.com"}');
// }));
//
// suite.addTest(new Test('Replacing multiple tags', function () {
//   assert.equal('{greeting} {subject}!'.format({greeting:'Hello',subject:'world'}),'Hello world!');
// }));
//
// suite.addTest(new Test('Replacing numbered tags', function () {
//   assert.equal('{0} {1}!'.format('Hello', 'world'),'Hello world!');
// }));
//
// suite.addTest(new Test('Null values', function () {
//   assert.equal('SELECT username FROM user WHERE id = {id};'.format({ id: null }),'SELECT username FROM user WHERE id = NULL;');
// }));
//
// suite.addTest(new Test('Boolean values', function () {
//   assert.equal('var isAdmin = {user.permissions.admin};'.format({user:{permissions:{admin:false}}}),'var isAdmin = false;');
//   assert.equal('var isAdmin = {user.permissions.admin};'.format({user:{permissions:{admin:true}}}),'var isAdmin = true;');
// }));
//
// suite.addTest(new Test('Non-existing numbered tags', function () {
//   assert.equal('{0} {1}{2}'.format('Hello', 'world'),'Hello world');
// }));

// Let's start testing
mocha.run();
