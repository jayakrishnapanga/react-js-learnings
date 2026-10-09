// var is not blocked scoped eventhough it is declared inside a block. So, the x declared inside the block is hoisted to the top of the function or global scope. So, the x declared inside the block is the same as the x declared outside the block. So, the x declared inside the block shadows the x declared outside the block. So, the x declared outside the block is not accessible inside the block. But the x declared inside the block is accessible outside the block. So, the output is 20

if (true) {
  var x = 20;
}
console.log(x); // 20

function jk() {
  var y = 20;
  console.log(y);
}


