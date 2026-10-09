// Higher Order functions:
// the ability of function that can accpet function as arguments or it will return the function 

// geaneral approach 
const calculateArea=(radius)=>{
    let output=[]
    for(let i=0;i<radius.length;i++){
        output.push(Math.PI*radius[i]*radius[i])
    }
    return output
}

const calculateDiameter=(radius)=>{
    let output=[]
    for(let i=0;i<radius.length;i++){
        output.push(2*radius[i])
    }
    return output
}

const calculateCirumference=(radius)=>{
    let output=[]
    for(let i=0;i<radius.length;i++){
        output.push(2*Math.PI*radius[i])
    }
    return output
}
let radius=[10,30,525]
const radiusoutput=calculateArea(radius)
const diameteroutput=calculateDiameter(radius)
const circumferenceoutput=calculateCirumference(radius)



// this is code  more otimised logic

const Arealogic=(radius)=>{
    return Math.PI*radius*radius
}
const diameterlogic=(radius)=>{
    return Math.PI*radius*radius
}
const circumferencelogic=(radius)=>{
    return Math.PI*radius*radius
}
const calculate=(radius,logic)=>{
    let output=[]
    for(let i=0;i<radius.length;i++){
        output.push(logic(radius[i]))
    }
    return output
}

const arealogicsimplied=calculate(radius,Arealogic)
const diameterlogicsimplifed=calculate(radius,diameterlogic)
const circumferencelogicsimplied=calculate(radius,circumferencelogic)





/// making my calculate function to work as map function in arrays
// calculate(radius,Arealogic) 
// it is optimised and we have make it as work like map function in arrays same like that only 


// here i tried to add this arrow function in Array.prototype
// it is added but when call using with object it will just check where the object is called , it is in global scope and it will point to windowobject in the case browser and {} module in the case of nodejs so it won't work in this case if you try to execute also that is the reason when you are adding custom functions , please using standalone functins not arrow functions
const calculatemap=(logic)=>{
    let output=[]
    console.log(this)
    for(let i=0;i<this.length;i++){
        output.push(logic(this[i]))
    }
    return output
}
function calculatemap(logic){
    let output=[]
    console.log(this)
    for(let i=0;i<this.length;i++){
        output.push(logic(this[i]))
    }
    return output
}
// and also we need to add this function in the Array.prototype
// then it is available to use on arrays

Array.prototype.myownMap=calculatemap
console.log(Object.getOwnPropertyNames(Array.prototype))
const myownmapimplementation =radius.myownMap(Arealogic)
console.log("hello ",myownmapimplementation)
// this always depends how you are calling that function myownMap is called by radius arrayobject then it point that only 
// that is the reason we remove array argument and we are just calling myownMap function without passing the arrayobject we just sending the logic to applied on that 
