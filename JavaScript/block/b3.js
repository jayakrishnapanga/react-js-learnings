function test() {
    var foo = 33;
    if (foo) {
      let bar = foo + 55; // Now works, bar is 88
      console.log(bar);
    }
  }
  test();
  