// let x = 1;

// switch (x) {
//   case 0:
//     let foo;
//     break;
//   case 1:
//     let foo; // SyntaxError: Identifier 'foo' has already been declared
//     break;
// }



// To avoid the error, wrap each case in a new block statement.

// let x = 1;

// switch (x) {
//   case 0: {
//     let foo;
//     break;
//   }
//   case 1: {
//     let foo;
//     break;
//   }
// }