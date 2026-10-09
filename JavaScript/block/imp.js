// However, this combination of var and let declarations below is a SyntaxError because var not being block-scoped, leading to them being in the same scope. This results in an implicit re-declaration of the variable.

// let x = 1;

{
  var x = 2; // SyntaxError for re-declaration
}
