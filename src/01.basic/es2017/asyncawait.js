//Option 1 - Use try catch within the function
async function doubleAndAdd(a, b) {
  try {
    a = await doubleAfter1Sec(a);
    b = await doubleAfter1Sec(b);
  } catch (e) {
    return NaN; //return something
  }
  return a + b;
}
//🚀Usage:
doubleAndAdd('one', 2).then(console.log); // NaN
doubleAndAdd(1, 2).then(console.log); // 6
function doubleAfter1Sec(param) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      let val = param * 2;
      isNaN(val) ? reject(NaN) : resolve(val);
    }, 1000);
  });
}

//Option 2 - *Catch* errors on  every await line
//as each await expression is a Promise in itself
async function doubleAndAdd(a, b) {
  a = await doubleAfter1Sec(a).catch(e => console.log('"a" is NaN')); // 👈
  b = await doubleAfter1Sec(b).catch(e => console.log('"b" is NaN')); // 👈
  if (!a || !b) {
    return NaN;
  }
  return a + b;
}
//🚀Usage:
doubleAndAdd('one', 2).then(console.log); // NaN  and logs:  "a" is NaN
doubleAndAdd(1, 2).then(console.log); // 6
function doubleAfter1Sec(param) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      let val = param * 2;
      isNaN(val) ? reject(NaN) : resolve(val);
    }, 1000);
  });
}

//Option 3 - Dont do anything but handle outside the function
//since async / await returns a promise, we can catch the whole function's error
async function doubleAndAdd(a, b) {
  a = await doubleAfter1Sec(a);
  b = await doubleAfter1Sec(b);
  return a + b;
}
//🚀Usage:
doubleAndAdd('one', 2)
  .then(console.log)
  .catch(console.log); // 👈👈🏼<------- use "catch"
function doubleAfter1Sec(param) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      let val = param * 2;
      isNaN(val) ? reject(NaN) : resolve(val);
    }, 1000);
  });
}
