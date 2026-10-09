let max=Infinity
console.log("the value of infinity ",Infinity)
console.log("the value of - infinity ",-Infinity)
function findLargestElement(arr) {
    let max=arr[0]
    for(let i=1;i<arr.length;i++){
        if(arr[i]>max){
            max=arr[i]
        }
    }
    return max
}

let arr=[1,90,4,90,5678,200]
console.log(findLargestElement(arr))