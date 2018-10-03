import expect from 'expect';

require('./array.fill');

test('All elements in the array', () => {
  expect([1,2,3].fill(4)).toMatchObject([4,4,4]);
});

test('Starting at defined index', () => {
  expect([1,2,3].fill(4,1)).toMatchObject([1,4,4]);
});

test('Single index', function() {
  expect([1,2,3].fill(4,1,2)).toMatchObject([1,4,3]);
});

test('Matching start & stop indexes', () => {
  expect([1,2,3].fill(4,1,1)).toMatchObject([1,2,3]);
});

test('Matching out-of-boundary start & stop indexes', function() {
  expect([1,2,3].fill(4,3,3)).toMatchObject([1,2,3]);
});

test('Matching out-of-boundary start & stop indexes', function() {
  expect([1,2,3].fill(4,3,3)).toMatchObject([1,2,3]);
});

test('Negative start & stop indexes', function() {
  expect([1,2,3].fill(4,-3,-2)).toMatchObject([4,2,3]);
});

test('NaN indexes', function() {
  expect([1,2,3].fill(4,NaN,NaN)).toMatchObject([1,2,3]);
});

test('Out-of-bounds index range', function() {
  expect([1,2,3].fill(4,3,5)).toMatchObject([1,2,3]);
});

test('Generate filled array', function() {
  expect(Array(3).fill(4)).toMatchObject([4,4,4]);
});

test('Called on object', function() {
  expect([].fill.call({ length: 3 }, 4)).toMatchObject({0:4,1:4,2:4,length:3});
});

test('Maintaining references', function() {
  var ref = {},
      arr = Array(3).fill(ref);
  expect(arr).toMatchObject([{},{},{}]);
  ref.hi = 'hi';
  expect(arr).toMatchObject([{hi:'hi'},{hi:'hi'},{hi:'hi'}]);
  arr[0].hi = 'bye';
  expect(arr).toMatchObject([{hi:'bye'},{hi:'bye'},{hi:'bye'}]);
});
