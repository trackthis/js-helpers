var path   = require('path'),
    assert = require('assert');

// Force setting the polyfill
process.env.TEST = 'Array.prototype.intersect';

// Include the flatten helper
var flatten = require(path.join('..', 'lib', 'flatten'));

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

// suite.addTest(new Test('Setting a first-level string by string key', function () {
//   set(ref,"hello","WORLD");
//   assert.equal(JSON.stringify(ref),'{"hello":"WORLD"}');
// }));
//
// suite.addTest(new Test('Setting a first-level string by invalid key', function () {
//   set(ref,Buffer.from("hello"),"this won't happen");
//   assert.equal(JSON.stringify(ref),'{"hello":"WORLD"}');
// }));
//
// suite.addTest(new Test('Setting a first-level string by array key', function () {
//   set(ref,["foo"],"BAR");
//   assert.equal(JSON.stringify(ref),'{"hello":"WORLD","foo":"BAR"}');
// }));
//
// suite.addTest(new Test('Overwrite first-level string by string key', function () {
//   set(ref,"foo","bar");
//   assert.equal(JSON.stringify(ref),'{"hello":"WORLD","foo":"bar"}');
// }));
//
// suite.addTest(new Test('Overwrite first-level string by array key', function () {
//   set(ref,["hello"],"world");
//   assert.equal(JSON.stringify(ref),'{"hello":"world","foo":"bar"}');
// }));
//
// suite.addTest(new Test('Setting a first-level object by string key', function () {
//   set(ref,"mail",{ body: "Dear recipient,\n\nHow are you going?\n\nKind regards,\n\nMail tester" });
//   assert.equal(JSON.stringify(ref),'{"hello":"world","foo":"bar","mail":{"body":"Dear recipient,\\n\\nHow are you going?\\n\\nKind regards,\\n\\nMail tester"}}');
// }));
//
// suite.addTest(new Test('Overwrite a first-level object by string key', function () {
//   set(ref,"mail",{ body: "Short mail" });
//   assert.equal(JSON.stringify(ref),'{"hello":"world","foo":"bar","mail":{"body":"Short mail"}}');
// }));
//
// suite.addTest(new Test('Overwrite a first-level object by string key without dependencies', function () {
//   set.call({noDependencies:true},ref,"mail",{ body: "Hi there" });
//   assert.equal(JSON.stringify(ref),'{"hello":"world","foo":"bar","mail":{"body":"Hi there"}}');
// }));
//
// suite.addTest(new Test('Setting a deep string by string key', function () {
//   set(ref,"mail.header.from","Test <test@example.com>");
//   assert.equal(JSON.stringify(ref),'{"hello":"world","foo":"bar","mail":{"body":"Hi there","header":{"from":"Test <test@example.com>"}}}');
// }));
//
// suite.addTest(new Test('Overwrite a deep string by string key', function () {
//   set(ref,"mail.header.from","Spammer");
//   assert.equal(JSON.stringify(ref),'{"hello":"world","foo":"bar","mail":{"body":"Hi there","header":{"from":"Spammer"}}}');
// }));
//
// // TODO: re-add these test
// // suite.addTest(new Test('Setting a first-level object by string key', function () {
// //   set(ref,"mail",{ from: "test@example.com" });
// //   assert.equal(JSON.stringify(ref),'{"hello":"world","foo":"bar","mail":{"from":"test@example.com"}}');
// // }));
// //
// // suite.addTest(new Test('Setting a deep string by string key', function () {
// //   set(ref,"mail.gpg.signature","0xDEADBEEF");
// //   assert.equal(JSON.stringify(ref),'{"hello":"world","foo":"bar","mail":{"from":"test@example.com","gpg":{"signature":"0xDEADBEEF"}}}');
// // }));
// //
// // suite.addTest(new Test('Setting a deep object by string key without require(\'extend\')', function () {
// //   set(ref,"mail.gpg.signature","0xDEADBEEF");
// //   assert.equal(JSON.stringify(ref),'{"hello":"world","foo":"bar","mail":{"from":"test@example.com","gpg":{"signature":"0xDEADBEEF"}}}');
// // }));
//
//
// // suite.addTest(new Test('Setting a first-level property by array key', function () {
// //   set(ref,["foo"],"bar");
// //   assert.equal(JSON.stringify(ref),'{"hello":"world","foo":"bar"}');
// // }));
//
// // suite.addTest(new Test('Setting a nested property by string key', function () {
// //   set(ref,"foo.bar","QWERTY");
// //   assert.equal(JSON.stringify(ref),'{"hello":"world","foo":{"bar":"QWERTY"}}');
// // }));
// //
// // suite.addTest(new Test('Overwriting a nested property by array key', function () {
// //   set(ref,["foo","bar"],"qwerty");
// //   assert.equal(JSON.stringify(ref),'{"hello":"world","foo":{"bar":"qwerty"}}');
// // }));

// Let's start testing
mocha.run();
