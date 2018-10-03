import expect from 'expect';

process.env.TEST = 'Array.prototype.unique';
require('./array.unique');

test('Already-unique array', function () {
  expect([1, 2, 3].unique()).toMatchObject([1,2,3]);
});

test('All duplicate array', function () {
  expect([ 1, 1, 1 ].unique()).toMatchObject([1]);
});

test('Single duplicate value', function () {
  expect([ 3, 2, 2, 1 ].unique()).toMatchObject([3,2,1]);
});
