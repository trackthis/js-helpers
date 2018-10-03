import expect from 'expect';

process.env.TEST = 'Array.prototype.includes';
require('./array.includes');

test('Finding numbers', () => {
  expect([1,2,3].includes(1)).toBe(true);
  expect([1,2,3].includes(2)).toBe(true);
  expect([1,2,3].includes(3)).toBe(true);
  expect([1,2,3].includes(4)).toBe(false);
});

test('Finding strings', () => {
  expect(['cat','dog','bat'].includes('cat')).toBe(true);
  expect(['cat','dog','bat'].includes('horse')).toBe(false);
});
