// let declarations cannot be in the same scope as any other declaration, including let, const, class, function, var, and import declaration.

{
    let foo;
    // let foo; // SyntaxError: Identifier 'foo' has already been declared
}
  

// A let declaration within a function's body cannot have the same name as a parameter. A let declaration within a catch block cannot have the same name as the catch-bound identifier.
// function foo(a) {
//     let a = 1; // SyntaxError: Identifier 'a' has already been declared
//   }
//   try {
//   } catch (e) {
//     let e; // SyntaxError: Identifier 'e' has already been declared
// }
  