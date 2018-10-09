import expect from 'expect';

process.env.TEST = 'setImmediate';
require('./set-immediate');

function clearQueue() {
  return new Promise(resolve=>setTimeout(resolve,10));
}

test('Async string concat', async () => {
  let result = '';
  setImmediate(() => result += 'A');
  result += 'B';
  expect(result).toBe('B');
  await clearQueue();
  expect(result).toBe('BA');
});

test('Clear an immediate', async () => {
  let result = '';
  let id     = setImmediate(() => result += 'A');
  result += 'B';
  expect(result).toBe('B');
  clearImmediate(id);
  await clearQueue();
  expect(result).toBe('B');
});
