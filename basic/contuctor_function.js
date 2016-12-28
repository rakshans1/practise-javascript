function User(firstName, lastName, age, gender) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.gender =gender;
}


User.prototype.getEmail = function() {
  return this.firstName + this.lastName + '@rakshanshetty.in';
}

var user = new User('Rakshan', 'Shetty', 21, 'M');

console.log(user);
console.log(user.getEmail().toLowerCase());
