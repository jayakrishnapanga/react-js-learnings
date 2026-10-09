let arr1 = [1, 3, 4, 5, 6];
let arr2 = [7, 8, 9, 10];
// console.log(arr1.join("-"));
// console.log(typeof arr1.join("-"));
// console.log(arr1.concat(arr1));
// console.log(arr1.reverse());
// console.log(arr1.toString())
// console.log(arr1.toLocaleString())
// console.log(arr1.lastIndexOf)
// console.log(arr1.includes("1"))

// splice = surgery (cutting and stitching inside the original array).
// slice = photocopy (copying out a portion without touching the original).
// splice(startindex,count,new elements,,,,)
// startindex -> ye index dhegara start cheyalii
//count yenni elements delete cheyali
//tharvatha commas peeti new elements add chesukovachu mana istam
arr1.splice(1, 1);
delete arr1[1];
console.log(arr1);
