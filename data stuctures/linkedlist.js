/*******************
_        _           _                 _     _        _         _
| |      (_)         | |               | |   | |      (_)       | |
| |       _   _ __   | | __   ___    __| |   | |       _   ___  | |_
| |      | | | '_ \  | |/ /  / _ \  / _` |   | |      | | / __| | __|
| |____  | | | | | | |   <  |  __/ | (_| |   | |____  | | \__ \ | |_
|______| |_| |_| |_| |_|\_\  \___|  \__,_|   |______| |_| |___/  \__|

Big O Notation = O (n)

*********************/


function LinkedList () {
  this.head = null;
  this.tail = null;
}

function Node(value, next, prev)  {
   this.value = value;
   this.next = next;
   this.prev = prev;
}

LinkedList.prototype.addToHead = function(value) {
  var newNode = new Node(value, this.head, null);          //create new node with Node Constructor Function
  if (this.head) this.head.prev = newNode;                 //if head is present  set prev pointer to newNode
  else this.tail = newNode;                                // if Linked list is empty head and tail are same
  this.head = newNode;                                    // finally set new node as head node
};

LinkedList.prototype.addToTail = function(value) {
  var newNode = new Node(value, null, this.tail);
  if (this.tail) this.tail.next = newNode;                //if tail is present  set next pointer to newNode
  else this.head = newNode;                               //if linked list is empty head and tail are same
  this.tail = newNode;                                    // finally set newNode as tail
};

LinkedList.prototype.removeHead = function() {
  if (!this.head) return null;                          //if no head present return null
  var val = this.head.value;                            //store val of head in var
  this.head = this.head.next;                           // make next element the head node
  if (this.head) this.head.prev = null;                 // if next element is present make its prev null
  else this.tail = null;                                 // if node head node then tail is null
  return val;
}

LinkedList.prototype.removeTail = function() {
  if (!this.tail) return null;
  var val = this.tail.value;
  this.tail = this.tail.prev;
  if (this.tail) this.tail.next = null;
  else this.head = null;
  return val;
}
LinkedList.prototype.search = function(searchValue) {
  var currentNode = this.head;
  while (currentNode) {
    if (currentNode.value === searchValue) return currentNode.value;
    currentNode = currentNode.next;
  }
  return null;
}
LinkedList.prototype.indexOf = function(searchValue) {
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


var ll = new LinkedList();

ll.addToHead(300);
ll.addToHead(200);
ll.addToHead(300);

console.log(ll);
console.log(ll.indexOf(200));
