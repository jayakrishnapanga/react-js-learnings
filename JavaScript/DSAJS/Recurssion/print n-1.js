// print n to 1 numbers using the recrussion

// function printNum(num) {
//   if (num == 0) {
//     return;
//   }
//   console.log(num);
//   num = num - 1;
//   printNum(num);
// }

// let num = 10;
// printNum(num);

// // using for loop
// for (let i = num; i > 0; i--) {
//   console.log(i);
// }

//  1 to n
let num = 20;
for (let i = 1; i <= num; i++) {
  console.log(i);
}

function print(n) {
  if (n > num) {
    return;
  }
  console.log(n);

  print(++n);
}

print(1);




