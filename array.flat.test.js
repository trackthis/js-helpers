import expect from 'expect';

process.env.TEST = 'Array.prototype.flat';
require('./array.flat');

test('[2] 1', () => {
  expect([1,2,[3,4]].flat()).toMatchObject([1,2,3,4]);
});

test('[3] 1', () => {
  expect([1,2,[3,4,[5,6]]].flat()).toMatchObject([1,2,3,4,[5,6]]);
});

test('[3] 2', () => {
  expect([1,2,[3,4,[5,6]]].flat(2)).toMatchObject([1,2,3,4,5,6]);
});

test('[,,] 1', () => {
  expect([1,2,,4,5].flat(0)).toMatchObject([1,2,4,5]);
});
