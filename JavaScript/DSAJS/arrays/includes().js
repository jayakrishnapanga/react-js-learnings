// The includes() method of Array instances determines whether an array includes a certain value among its entries, returning true or false as appropriate.

// array lo manaku kavalsina value undha ledh ami check chesthadiii

// syntax
// includes(searchElement)

const array1 = [1, 2, 3];

console.log(array1.includes(2));
// Expected output: true

const pets = ["cat", "dog", "bat"];

console.log(pets.includes("cat"));
// Expected output: true

console.log(pets.includes("at"));
// Expected output: false
console.log(pets[0])



// includes(searchElement, fromIndex)
console.log(pets.includes("cat",0));// output:true
// cat at 0 index lo undhaa ani check chesthunam manam 
// unte it will give true lekapothe false
console.log(pets.includes("cat",1));// output:false



// Custom implementation of includes() method
// This function checks if an array includes a certain element
// starting from a specified index (default is 0).
// It returns true if the element is found, otherwise false.
function customIncludes(arr, searchElement, fromIndex = 0) {
    for (let i = fromIndex; i < arr.length; i++) {
        if (arr[i] === searchElement) {
            return true;
        }
    }
    return false;
}