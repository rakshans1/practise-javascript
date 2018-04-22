/********************************
_    _           _       _______    _     _
| |  | |         | |     |__   __|  | |   | |
| |__| | __ _ ___| |__      | | __ _| |__ | | ___
|  __  |/ _` / __| '_ \     | |/ _` | '_ \| |/ _ \
| |  | | (_| \__ \ | | |    | | (_| | |_) | |  __/
|_|  |_|\__,_|___/_| |_|    |_|\__,_|_.__/|_|\___|

Big O Notation = O (1)
********************************/

function HashTable(size) {
  this.buckets = Array(size);
  this.numBuckets = this.buckets.length;
}
function HashNode(key, value, next) {
  this.key = key;
  this.value = value;
  this.next = next || null;
}
HashTable.prototype.hash = function(key) {
  var total = 0;
  for (var i=0; i < key.length; i++) {
    total += key.charCodeAt(i);
  }
  total %= this.numBuckets;
  return total;
}
HashTable.prototype.insert = function(key, value) {
  var index = this.hash(key);
  if (!this.buckets[index]) {
    this.buckets[index] = new HashNode(key, value);
  } else if (this.buckets[index].key === key) {
      this.buckets[index].value = value;
      return;
  }
  else {
    var currentNode = this.buckets[index];
    while (currentNode.next) {
      if (currentNode.next.key === key) {
        currentNode.next.value = value;
        return;
      }
      currentNode = currentNode.next;
    }
    currentNode.next = new HashNode(key, value);
  }
}
HashTable.prototype.get = function(key) {
  var index = this.hash(key);
  if (!this.buckets[index])return null;
  else {
    var currentNode = this.buckets[index];
    while (currentNode) {
      if (currentNode.key === key) return currentNode.value;
      currentNode = currentNode.next;
    }
  }
}
HashTable.prototype.retriveAll = function() {
  var nodeArray = [];
  for (var i=0; i<=this.numBuckets; i++) {
    var currentNode = this.buckets[i];
    while (currentNode) {
      nodeArray.push(currentNode);
      currentNode = currentNode.next;
    }
  }
  return nodeArray;
}
var ht = new HashTable(30);
ht.insert('Rakshan', 'shetty.raxx555@gmail.com')
ht.insert('Rakshna', 'shetty.raxx555@gmail.com')
ht.insert('Dean', 'shetty.raxx555@gmail.com')
console.log(ht);
console.log(ht.retriveAll());
