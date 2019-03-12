/** ******************************
 _    _           _       _______    _     _
 | |  | |         | |     |__   __|  | |   | |
 | |__| | __ _ ___| |__      | | __ _| |__ | | ___
 |  __  |/ _` / __| '_ \     | |/ _` | '_ \| |/ _ \
 | |  | | (_| \__ \ | | |    | | (_| | |_) | |  __/
 |_|  |_|\__,_|___/_| |_|    |_|\__,_|_.__/|_|\___|

 Big O Notation = O (1)
 ******************************* */

import LinkedList from '../01.linked-list/LinkedList';

// hash table size directly affects on the number of collisions.
// The bigger the hash table size the less collision you'll get.
// For demonstration purposes hash table size is small to show how collisions
// are being handled.
const defaultHashTableSize = 32;

class HashTable {
  /**
   * @param { number } HashhTableSize
   */
  constructor(hashTableSize = defaultHashTableSize) {
    // Create hash table of certain size and fill each bucket with empty linked list.
    this.buckets = Array(hashTableSize).fill(null).map(() => new LinkedList());

    // Just to keep tack of all actual keys in a fast way.
    this.keys = {};
  }

  /**
   * Converts key string to hash number.
   *
   * @params {string} Key
   * @return {number}
   */
  hash(key) {
    // For simplicity reasons we will just use character codes sum of all characters of the key
    // to calculate the hash.
    //
    // But you may also use more sophisticated approaches like polynomial string hash to reduce the
    // number of collisions:
    //
    // hash = charCodeAt(0) * PRIME^(n-1) + charCodeAt(1) * PRIME^(n-2) + ... + charCodeAt(n-1)
    //
    // where charCodeAt(i) is the i-th character code of the key, n is the length of the key and
    const hash = Array.from(key).reduce(
      (hashAccumulator, keySymbol) => (hashAccumulator + keySymbol.charCodeAt(0)),
      0,
    );

    // Reduce hash number so it would fit hash table size.
    return hash % this.buckets.length;
  }

  /**
   * @param {string} key
   * @param {*} value
   */
  set(key, value) {
    const keyhash = this.hash(key);
    this.keys[key] = keyhash;
    const bucketLinkedList = this.buckets[keyhash];
    const node = bucketLinkedList.find({ callback: nodevalue => nodevalue.key === key });

    if (!node) {
      // Insert new node.
      bucketLinkedList.append({ key, value });
    } else {
      // Update value of existing node.
      node.value.value = value;
    }
  }

  /**
   * @param {string} key
   * @return {*}
   */
  get(key) {
    const bucketLinkedList = this.buckets[this.hash(key)];
    const node = bucketLinkedList.find({ callback: nodevalue => nodevalue.key === key });

    return node ? node.value.value : undefined;
  }

  /**
   * @param {string} key
   * @return {*}
   */
  delete(key) {
    const keyHash = this.hash(key);
    delete this.keys[key];
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({ callback: nodevalue => nodevalue.key === key });

    if (node) {
      return bucketLinkedList.delete(node.value);
    }

    return null;
  }

  /**
   * @param {string} key
   * @return {boolean}
   */
  has(key) {
    return Object.hasOwnProperty.call(this.keys, key);
  }

  /**
   * @return {string[]}
   */
  getKeys() {
    return Object.keys(this.keys);
  }
}

export default HashTable;
