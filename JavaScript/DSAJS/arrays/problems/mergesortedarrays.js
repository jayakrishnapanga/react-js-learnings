var merge = function(nums1, m, nums2, n) {
    let mergedarray=[]
    let i=0
    let j=0
    while(i<m&& j<n){
        if(nums1[i]<=nums2[j]){
            mergedarray.push(nums1[i])
            i++
        }else{
            mergedarray.push(nums2[j])
            j++
        }
    }
    if(j<nums2.length){
        for(let k=j;k<=j;k++){
            mergedarray.push(nums2[j])
        }
    }
    if(i<nums1.length){
        for(let k=i;k<=i;k++){
            mergedarray.push(nums2[j])
        }
    }
    return mergedarray
};

[1,2,3,0,0,0]
[2,5,6]