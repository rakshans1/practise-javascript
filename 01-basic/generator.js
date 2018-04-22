function* idMaker() {
  var index = 0;
  while (true)
    yield index++;
}

var gen = idMaker();

console.log(gen.next());
console.log(gen.next());



function* foo() {
  yield 1;
  yield 2;
  yield 3;
}
function* bar() {
  yield* foo();
}
const iter = bar();

console.log(...iter);


function* fibonacci(n) {
  let current = 1;
  let next = 1;
  while (n--) {
    yield current;
    [current, next] = [next, current + next];
  }
}

var it = fibonacci(10);

for (var v of it) {
  console.log(v);
}