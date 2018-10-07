import DoublyLinkedListNode from './DoublyLinkedListNode';

class DoublyLinkedList {
  constructor() {
    /* @var DoublyLinkedListNode */
    this.head = null;

    /* @var DoublyLinkedListNode */
    this.tail = null;
  }

  /*
   * @param {*} value
   * @return {DoublyLinkedList}
   */
  append(value) {
    const newNode = new DoublyLinkedListNode(value);

    // If there is no head yet let's make new node a head.
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }

    // Attach new node to the end of linkedlist.
    this.tail.next = newNode;

    // Attach current tail to the new node's previous references.
    newNode.previous = this.tail;

    this.tail = newNode;

    return this;
  }

  /*
   * @param {*} value
   * @return {DoublyLinkedList}
   */
  prepend(value) {
    // make new node to be a head.
    const newNode = new DoublyLinkedListNode(value);

    if (this.head) {
      this.head.previous = newNode;
    }

    newNode.next = this.head;

    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  /*
   * @param {Object} findParams
   * @param {*} findParams.value
   * @param {function} [findParams.callback]
   * @return {DoublyLinkedListNode}
   */
  find(value, callback = undefined) {
    if (!this.head) {
      return null;
    }

    let currentNode = this.head;
    while (currentNode) {
      // If callback is specified then try to find node by callback.
      if (callback && callback(currentNode.value)) {
        return currentNode;
      }
      // If value is specified then try to compare by value..
      if (value !== undefined && currentNode.value === value) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  /*
   * @param {*} value
   * @return {DoublyLinkedListNode}
   */
  delete(value) {
    if (!this.head) {
      return null;
    }

    let deletedNode = null;
    let currentNode = this.head;

    while (currentNode) {
      if (currentNode.value === value) {
        deletedNode = currentNode;

        if (deletedNode === this.head) {
          // If HEAD is going to be deleted...
          this.head = deletedNode.next;

          // Set new head's previous to null.
          if (this.head) {
            this.head.previous = null;
          }

          if (deletedNode === this.tail) {
            this.tail = null;
          }
        } else if (deletedNode === this.tail) {
          // If TAIL is going to be deleted...
          this.tail = deletedNode.previous;
          this.tail.next = null;
        } else {
          // If MIDDLE node is going to be deleted...
          const previousNode = deletedNode.previous;
          const nextNode = deletedNode.next;

          previousNode.next = nextNode;
          nextNode.previous = previousNode;
        }
      }
      currentNode = currentNode.next;
    }
    return deletedNode;
  }

  /*
   * @return {DoublyLinkedListNode}
   */
  deleteHead() {
    if (!this.head) {
      // No head to delete
      return null;
    }

    const deletedHead = this.head;

    if (this.head.next) {
      this.head = this.head.next;
      this.head.previous = null;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  /*
   * @return {DoublyLinkedListNode}
   */
  deleteTail() {
    if (!this.tail) {
      // No tail to delete.
      return null;
    }

    if (this.head === this.tail) {
      // There is only one node in linked list.
      const deletedTail = this.tail;
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    // If there are many nodes in linked list...
    const deleTedTail = this.tail;

    this.tail = this.tail.previous;
    this.tail.next = null;

    return deleTedTail;
  }

  /*
   * @return {DoublyLinkedListNode[]}
   */
  toArray() {
    const nodes = [];

    let currentNode = this.head;

    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  /*
   * @param {*[]} values - Array of values that need to be converted to linked list.
   * @return {DoublyLinkedList}
   */
  fromArray(values) {
    values.forEach(value => this.append(value));

    return this;
  }

  /*
   * @param {function} [callback]
   * @return {string}
   */
  toString(callback) {
    return this.toArray().map(node => node.toString(callback)).toString();
  }

  /*
   * Reverse a linked list.
   * @returns {DoublyLinkedList}
   */
  reverse() {
    let currNode = this.head;
    let preNode = null;
    let nextNode = null;
    while (currNode) {
      nextNode = currNode.next;

      currNode.next = preNode;

      preNode = currNode;
      currNode = nextNode;
    }

    this.tail = this.head;
    this.head = preNode;

    return this;
  }
}

export default DoublyLinkedList;
