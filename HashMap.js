import Node from './Node.js';

export default class HashMap {
  constructor(loadFactor) {
    this.#loadFactor = loadFactor;
  }

  #buckets = new Array(16);
  #capacity = 0;
  #length = 0;
  #loadFactor = 0.75;

  #hash(key) {
    let hashCode = 0;

    for (let i = 0; i < key.length; i++) {
      hashCode = (31 * hashCode + key.charCodeAt(i)) % this.#buckets.length;
    }

    return hashCode;
  }

  #resize() {
    const entries = this.entries();
    this.#buckets = new Array(this.#buckets.length * 2);

    for (const [key, value] of entries) {
      this.set(key, value);
    }
  }

  getNumberOfBuckets() {
    return this.#buckets.length;
  }

  set(key, value) {
    const hashCode = this.#hash(key);

    if (this.#buckets[hashCode]) {
      let prev = null;
      let cursor = this.#buckets[hashCode];
      while (cursor) {
        if (cursor.key === key) {
          cursor.value = value;
          return false;
        } else {
          prev = cursor;
          cursor = cursor.nextNode;
        }
      }
      prev.nextNode = new Node(key, value);
    } else {
      this.#buckets[hashCode] = new Node(key, value);
      this.#capacity++;
    }

    this.#length++;

    if (this.#buckets.length * this.#loadFactor < this.#capacity) this.#resize();

    return true;
  }

  get(key) {
    const hashCode = this.#hash(key);

    if (this.#buckets[hashCode]) {
      let cursor = this.#buckets[hashCode];
      while (cursor) {
        if (cursor.key === key) return cursor.value;
        cursor = cursor.nextNode;
      }
    }

    return null;
  }

  has(key) {
    const hashCode = this.#hash(key);

    if (this.#buckets[hashCode]) {
      let cursor = this.#buckets[hashCode];
      while (cursor) {
        if (cursor.key === key) return true;
        cursor = cursor.nextNode;
      }
    }

    return false;
  }

  length() {
    return this.#length;
  }

  clear() {
    this.#buckets = new Array(16);
  }

  remove(key) {
    const hashCode = this.#hash(key);

    if (this.#buckets[hashCode]) {
      if (this.#buckets[hashCode].key === key) {
        this.#buckets[hashCode] = this.#buckets[hashCode].nextNode;
        return true;
      }

      let prev = null;
      let cursor = this.#buckets[hashCode];
      while (cursor) {
        if (cursor.key === key) {
          prev.nextNode = cursor.nextNode;
          return true;
        } else {
          prev = cursor;
          cursor = cursor.nextNode;
        }
      }
    }

    return false;
  }

  keys() {
    const keys = [];

    for (const bucket of this.#buckets) {
      let cursor = bucket;
      while (cursor) {
        keys.push(cursor.key);
        cursor = cursor.nextNode;
      }
    }

    return keys;
  }

  values() {
    const values = [];

    for (const bucket of this.#buckets) {
      let cursor = bucket;
      while (cursor) {
        values.push(cursor.value);
        cursor = cursor.nextNode;
      }
    }

    return values;
  }

  entries() {
    const entries = [];

    for (const bucket of this.#buckets) {
      let cursor = bucket;
      while (cursor) {
        entries.push([cursor.key, cursor.value]);
        cursor = cursor.nextNode;
      }
    }

    return entries;
  }
}
