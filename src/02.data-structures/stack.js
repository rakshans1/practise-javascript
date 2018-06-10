class Stack {
  constructor() {
    this.list = [];
    this.length = 0;
  }
  push(value) {
    this.list.push(value);
    this.length++;
  }
  pop() {
    if (this.length === 0 ) return;
    this.list.pop();
    this.length--;
  }
  peek() {
    return this.list[0];
  }
}

var s = new Stack();
s.push(1);
s.push(2)
s.pop();

console.log(s)
