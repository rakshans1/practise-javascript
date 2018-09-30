/** ****************
   ____
  / __ \
 | |  | |_   _  ___ _   _ ___  ___
 | |  | | | | |/ _ \ | | / __|/ _ \
 | |__| | |_| |  __/ |_| \__ \  __/
  \___\_\\__,_|\___|\__,_|___/\___|

Big O Notation = O (1)

**************** */
class Queues {
  constructor() {
    this.list = [];
    this.length = 0;
  }

  equeue(value) {
    this.length++;
    this.list.push(value);
  }

  dequeue() {
    if (this.length === 0) return;
    this.length--;
    return this.list.shift();
  }

  peek() {
    return this.list[0];
  }
}

const q = new Queues();

q.equeue(1);
q.equeue(2);
q.equeue(3);
q.dequeue();

console.log(q);
