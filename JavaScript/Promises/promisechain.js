// Without return, the Promise chain breaks after the first .then(), causing subsequent .then() calls to receive undefined


function createOrderApi(cart){
    return new Promise(function(resolve, reject){
         //   here we have the logic creating order
        //  validating the cart
        if(cart){
            resolve("12345") //we will return the order id 
        }else{
            const err=new Error("cart is not valid")
            reject(err)
        }
    })
}
function proceedToPayment(orderid){
    console.log(orderid)
    return new Promise(function(resolve,reject){
        resolve("transc12345")
    })

}
function displayStatus(paymentid){
    return new Promise(function(resolve,reject){
        resolve("fetched all payemt details and order details ")
    })
}


createOrderApi("pepejeans")
.then(function (orderid){
    return proceedToPayment(orderid)
})
.then(function(paymentid){
    return displayStatus(paymentid)
})
.then(function(data){
    console.log(data)
})
.catch(function(){
    console.log(err)
})
