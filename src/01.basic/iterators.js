const array = [1, 2, 3];

const iterator = array[Symbol.iterator]();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

for (const a of array) {
  console.log(a);
}


const customIterableObject = {
  0: 'zero',
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index <= 4) {
          index++;
          return { value: this[index - 1], done: false };
        }
        return { value: undefined, done: true };
      },
    };
  },
};


for (const a of customIterableObject) {
  console.log(a);
}

console.log(...customIterableObject);

const Fib = {
  [Symbol.iterator]() {
    let n1 = 1,
      n2 = 1;
    return {
      next() {
        const current = n2;
        n2 = n1;
        n1 += current;
        return { value: current, done: false };
      },
    };
  },
};
for (const v of Fib) {
  console.log(v);
  if (v > 50) break;
}
