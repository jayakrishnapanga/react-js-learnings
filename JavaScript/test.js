let arr = [1, 2, 3, 4, 5];

let arr2 = new Array(1, 23);
console.log(typeof arr2);
// console.log( typeof arr)

arr.forEach((item) => {
  console.log(item);
});

async function test() {
  console.log("test");
  console.log("test completed");
}
async function test2() {
  console.log("test2");
}

await test();
await test2();