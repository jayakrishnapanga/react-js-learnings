let myset=new Set()

const obj={
    name:"mahesh"
}
console.log(myset)

myset.add("jk")
myset.add("mk")
myset.add(2)
myset.add("mk")
myset.add(obj)
console.log(myset)
console.log(myset.has(obj))