/* ****************************
    ____
  / __ \
 | |  | |_   _  ___ _   _  ___
 | |  | | | | |/ _ \ | | |/ _ \
 | |__| | |_| |  __/ |_| |  __/
  \___\_\\__,_|\___|\__,_|\___|

 **************************** */

import LinkedList from '../01.linked-list/LinkedList';


class Queue {
  constructor() {
    this.linkedList = new LinkedList();
  }

  /**
   * @return {boolean}
   */
  isEmpty() {
    return !this.linkedList.tail;
  }

  /**
   * Read the element at the front of the queue without removing it.
   * @return {*}
   */
  peek() {
    if (!this.linkedList.head) {
      return null;
    }
    return this.linkedList.head.value;
  }

  /**
   * Add a new element to the end of the queue (the tail of the linked list).
   * This element will be processed after all elements ahead of it.
   * @param {*} value
   */
  enqueue(value) {
    this.linkedList.append(value);
  }

  /**
   * Remove the element at the front of the queue (the head of the linked list).
   * If the queue is empty, return null.
   * @return {*}
   */
  dequeue() {
    const removedHead = this.linkedList.deleteHead();
    return removedHead ? removedHead.value : null;
  }

  /**
   * @param [callback]
   * @return {string}
   */
  toString(callback) {
    // Return string representation of the queue's linked list.
    return this.linkedList.toString(callback);
  }
}

export default Queue;
