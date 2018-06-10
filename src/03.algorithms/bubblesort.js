/****************************
  ____        _     _     _         _____            _
|  _ \      | |   | |   | |       / ____|          | |
| |_) |_   _| |__ | |__ | | ___  | (___   ___  _ __| |_
|  _ <| | | | '_ \| '_ \| |/ _ \  \___ \ / _ \| '__| __|
| |_) | |_| | |_) | |_) | |  __/  ____) | (_) | |  | |_
|____/ \__,_|_.__/|_.__/|_|\___| |_____/ \___/|_|   \__|

Big O Notaion = O (n^2)
****************************/

let array = [];
for (let i = 10; i > 0 ; i--) {
  array.push(i);
}

for (let i = 0; i < array.length; i++) {
  for (let j = 0; j < array.length; j ++) {
    if (array[j] > array[j + 1]) {
      let temp = array[j];
      array[j] = array[j + 1];
      array[j + 1] = temp;
    }
  }
}
console.log(array);

