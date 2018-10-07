
/* ****************************
    ___  _             _
  / ____| |           | |
    (___| |_ __ _  ___| | __
  \___ \| __/ _` |/ __| |/ /
  ____) | || (_| | (__|   <
  _____/ \__\__,_|\___|_|\_\

**************************** */

import LinkedList from '../01.linked-list/LinkedList';
/**
 * @class Stack
 */
class Stack {
  constructor() {
    this.linkedList = new LinkedList();
    this.length = 0;
  }

  /**
   * @return {boolean}
   */
  isEmpty() {
    return !this.linkedList.tail;
  }

  /**
   * @return {*}
   */
  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.linkedList.tail.value;
  }

  /**
   * @return {*} value
   */
  push(value) {
    this.linkedList.append(value);
    this.length += 1;
  }

  /**
   * @return {*[]}
   */
  pop() {
    const removeTail = this.linkedList.deleteTail();
    if (removeTail) {
      this.length -= 1;
      return removeTail.value;
    }
    return null;
  }

  /**
   * @return {*[]}
   */
  toArray() {
    return this.linkedList
      .toArray()
      .map(linkedListNode => linkedListNode.value)
      .reverse();
  }

  /**
   * @param {function} [callback]
   * @return {string}
   */
  toString(callback) {
    return this.linkedList.toString(callback);
  }
}

export default Stack;
