import Node from './Node.js';

test('Node class creates node', () => {
  expect(new Node('key', 13)).toEqual({ key: 'key', value: 13, nextNode: null });
});
