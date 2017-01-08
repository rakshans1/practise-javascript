/*******************
_        _           _                 _     _        _         _
| |      (_)         | |               | |   | |      (_)       | |
| |       _   _ __   | | __   ___    __| |   | |       _   ___  | |_
| |      | | | '_ \  | |/ /  / _ \  / _` |   | |      | | / __| | __|
| |____  | | | | | | |   <  |  __/ | (_| |   | |____  | | \__ \ | |_
|______| |_| |_| |_| |_|\_\  \___|  \__,_|   |______| |_| |___/  \__|

Big O Notation = O (n)

*********************/
function Node(value, next, prev)  {
   this.value = value;
   this.next = next;
   this.prev = prev;
}

class LinkedList {
  constructor()  {
    this.head = null;
    this.tail = null;
  }
  addToHead(value) {
    var newNode = new Node(value, this.head, null);
    if (this.head) this.head.prev = newNode;
    else this.tail = newNode;
    this.head = newNode;
  }
  addToTail(value) {
    var newNode = new Node(value, null, this.tail);
    if (this.tail) this.tail.next = newNode;
    else this.head = newNode;
    this.tail = newNode;
  }
  removeHead() {
    if (!this.head) return null;
    var val = this.head.value;
    this.head = this.head.next;
    if (this.head) this.head.prev = null;
    else this.tail = null;                                
    return val;
  }
  removeTail() {
    if (!this.tail) return null;
    var val = this.tail.value;
    this.tail = this.tail.prev;
    if (this.tail) this.tail.next = null;
    else this.head = null;
    return val;
  }
  search(searchValue) {
    var currentNode = this.head;
    while (currentNode) {
      if (currentNode.value === searchValue) return currentNode.value;
      currentNode = currentNode.next;
    }
    return null;
  }
  indexOf(searchValue) {
    var currentNode = this.head;
    var index = 0;
    var indexArray = [];
    while (currentNode) {
      if (currentNode.value === searchValue) indexArray.push(index);
      currentNode = currentNode.next;
      index++;
    }
    return indexArray;
  }
}

var ll = new LinkedList();

ll.addToHead(300);
ll.addToHead(200);
ll.addToHead(300);
ll.removeTail();

console.log(ll);
console.log(ll.indexOf(200));
