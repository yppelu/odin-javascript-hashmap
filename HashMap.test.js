import HashMap from './HashMap.js';

describe('HashMap', () => {
  test('HashMap sets a value', () => {
    const hashMap = new HashMap(0.75);
    hashMap.set('a', 1);
    expect(hashMap.get('a')).toBe(1);
  });

  test('HashMap changes the value of node for the same key', () => {
    const hashMap = new HashMap(0.75);
    hashMap.set('a', 1);
    hashMap.set('a', 2)
    expect(hashMap.get('a')).toBe(2);
  });

  test('HashMap creates a linked list for the equally hashed nodes', () => {
    const hashMap = new HashMap(0.75);
    hashMap.set('a', 1);
    hashMap.set('q', 2);
    expect([hashMap.get('a'), hashMap.get('q')]).toEqual([1, 2]);
  });

  test('HashMap test method works correctly', () => {
    const hashMap = new HashMap(0.75);
    hashMap.set('a', 1);
    hashMap.set('q', 2);
    expect(hashMap.has('a')).toBe(true);
    expect(hashMap.has('q')).toBe(true);
    expect(hashMap.has('b')).toBe(false);
  });

  test('HashMap length method works correctly', () => {
    const hashMap = new HashMap(0.75);
    for (let i = 97; i <= 122; i++) {
      hashMap.set(String.fromCharCode(i) + String.fromCharCode(i), i);
    }
    expect(hashMap.length()).toBe(26);
  });

  test('HashMap clear method works correctly', () => {
    const hashMap = new HashMap(0.75);
    for (let i = 97; i <= 122; i++) {
      hashMap.set(String.fromCharCode(i) + String.fromCharCode(i), i);
    }
    expect(hashMap.get('aa')).toBe(97);
    hashMap.clear();
    expect(hashMap.get('aa')).toBe(null);
  });

  test('HashMap remove method works correctly', () => {
    const hashMap = new HashMap(0.75);
    hashMap.set('a', 97);
    hashMap.set('q', 113);
    expect(hashMap.remove('b')).toBe(false);
    expect(hashMap.remove('a')).toBe(true);
    expect(hashMap.get('a')).toBe(null);
    expect(hashMap.get('q')).toBe(113);
  });

  test('HashMap keys method works correctly', () => {
    const hashMap = new HashMap(0.75);
    const keys = [];
    for (let i = 97; i <= 122; i++) {
      const key = String.fromCharCode(i) + String.fromCharCode(i);
      hashMap.set(key, i);
      keys.push(key);
    }
    expect(hashMap.keys()).toEqual(keys);
  });

  test('HashMap values method works correctly', () => {
    const hashMap = new HashMap(0.75);
    const values = [];
    for (let i = 97; i <= 122; i++) {
      const key = String.fromCharCode(i) + String.fromCharCode(i);
      hashMap.set(key, i);
      values.push(i);
    }
    expect(hashMap.values()).toEqual(values);
  });

  test('HashMap entries method works correctly', () => {
    const hashMap = new HashMap(0.75);
    const entries = [];
    for (let i = 97; i <= 122; i++) {
      const key = String.fromCharCode(i) + String.fromCharCode(i);
      hashMap.set(key, i);
      entries.push([key, i]);
    }
    expect(hashMap.entries()).toEqual(entries);
  });
});
