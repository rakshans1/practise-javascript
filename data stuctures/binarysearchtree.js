/****************************
____  _                           _____                     _       _______
|  _ \(_)                         / ____|                   | |     |__   __|
| |_) |_ _ __   __ _ _ __ _   _  | (___   ___  __ _ _ __ ___| |__      | |_ __ ___  ___
|  _ <| | '_ \ / _` | '__| | | |  \___ \ / _ \/ _` | '__/ __| '_ \     | | '__/ _ \/ _ \
| |_) | | | | | (_| | |  | |_| |  ____) |  __/ (_| | | | (__| | | |    | | | |  __/  __/
|____/|_|_| |_|\__,_|_|   \__, | |_____/ \___|\__,_|_|  \___|_| |_|    |_|_|  \___|\___|
                          __/ |
                         |___/
Using Recursion
Big O Notaion = O (log n)
****************************/

function BST(value) {
  this.value = value;
  this.left = null;
  this.right = null;
};

BST.prototype.insert = function(value) {
  if (value <= this.value) {                                  // if value id less than current node put in left side
    if (!this.left) this.left = new BST(value);               // if left side is empty create new BST
    else this.left.insert(value);                             // if not empty insert in left node
  } else if (value > this.value) {
    if (!this.right) this.right = new BST(value);
    else this.right.insert(value);
  }
};

BST.prototype.contains = function(value) {
  if (value === this.value) return true;
  else if (value < this.value) {
    if (!this.left) return false;
    else return this.left.contains(value);
  } else if (value > this.value) {
    if (!this.right) return false;
    else return this.right.contains(value);
  }
};
BST.prototype.depthFirstTraversal = function(iteratorFunc, order) {
  if (order === 'pre-order') iteratorFunc(this.value);
  if (this.left) this.left.depthFirstTraversal(iteratorFunc, order);
  if (order ==='in-order') iteratorFunc(this.value);
  if (this.right) this.right.depthFirstTraversal(iteratorFunc, order);
  if (order === 'post-order') iteratorFunc(this.value);
};
BST.prototype.breadthFirstTraversal = function(iteratorFunc) {
  var queue = [this];
  while (queue.length) {
    var treeNode = queue.shift();
    iteratorFunc(treeNode.value)
    if (treeNode.left) queue.push(treeNode.left);
    if (treeNode.right) queue.push(treeNode.right);
  }
};
BST.prototype.getMinVal = function() {
  if (this.left) return this.left.getMinVal();
  else return this.value;
};
BST.prototype.getMaxVal = function() {
  if (this.right) return this.right.getMaxVal();
  else return this.value;
};

var bst = new BST(50);

bst.insert(30);
bst.insert(70);
bst.insert(100);
bst.insert(60);
bst.insert(59);
bst.insert(20);
bst.insert(45);
bst.insert(35);
bst.insert(85);
bst.insert(105);
bst.insert(10);

console.log(bst);
bst.depthFirstTraversal(log, 'in-order');
bst.breadthFirstTraversal(log);
console.log(`MIN: ${bst.getMinVal()}`);
console.log(`MAX: ${bst.getMaxVal()}`);

function log(value) {
  console.log(value);
}
