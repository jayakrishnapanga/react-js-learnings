function createCounter(){
    let count=0;
    return{
        increment:function(){
            count++
            return count
        },
        decrement:function(){
            if(count>0){
                count--
                return count
            }else{
                return "count cannot be negative number"
            }
        },
        reset:function(){
            count=0
        }

    }
}

let counter=createCounter()
console.log(counter.increment())
console.log(counter.decrement())
