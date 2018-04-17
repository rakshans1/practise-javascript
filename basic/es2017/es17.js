// 1. Object.values()

const cars = { Bmw: 3, Tesla: 2, Toyota: 1 };
const values = Object.values(cars);

console.log(values); // [3,2,1]

// 2. Object.entries()

const entries = Object.entries(cars);

for (const [key, value] of entries) {

  console.log(key, value); // Bmw 3, Tesla 2, Toyota 1

}

// 3. String padding

// 'someString'.padStart(numberOfCharcters [,stringForPadding]);
'5'.padStart(10); // '          5'
'5'.padStart(10, '=*'); // '=*=*=*=*=5'
'5'.padEnd(10); // '5         '
'5'.padEnd(10, '=*'); // '5=*=*=*=*='


// 4. Object.getOwnPropertyDescriptors

var Car = {
  name: 'BMW',
  price: 1000000,
  set discount(x) {

    this.d = x;

  },
  get discount() {

    return this.d;

  }
};
// Print details of Car object's 'discount' property

console.log(Object.getOwnPropertyDescriptor(Car, 'discount'));
// Prints..
// {
//   Get: [Function: get],
//   Set: [Function: set],
//   Enumerable: true,
//   Configurable: true
// }
// Copy Car's properties to ElectricCar using Object.assign
const ElectricCar = Object.assign({}, Car);
// Print details of ElectricCar object's 'discount' property

console.log(Object.getOwnPropertyDescriptor(ElectricCar, 'discount'));
// Prints..
// {
//   Value: undefined,
//   Writable: true,
//   Enumerable: true,
//   Configurable: true

// }
// ⚠️Notice that getters and setters are missing in ElectricCar object for 'discount' property !👎👎
// Copy Car's properties to ElectricCar2 using Object.defineProperties
// And extract Car's properties using Object.getOwnPropertyDescriptors
const ElectricCar2 = Object.defineProperties({}, Object.getOwnPropertyDescriptors(Car));
// Print details of ElectricCar2 object's 'discount' property

console.log(Object.getOwnPropertyDescriptor(ElectricCar2, 'discount'));
 // Prints..
 // { get: [Function: get],  👈🏼👈🏼👈🏼
 //   Set: [Function: set],  👈🏼👈🏼👈🏼
 //   Enumerable: true,
 //   Configurable: true
 // }
 // Notice that getters and setters are present in the ElectricCar2 object for 'discount' property!