

// here createOrderApi is the main async function it's duty to create order and callback 
// the function that will make payment proceedToPayment
// and the proccedToPayment also needs to call the displayStatus function to show the order status and payment status 
// then in proceedToPayment we add will add one callback and call the displayStatus function 

// callback hell
// ---------------------------
// this how callback inside a callback are nested this makes our code to grow horziontally 
// and makes difficult to read and maintain and debug

// exlpore this link 
// http://callbackhell.com/


function proceedToPayment(orderid,callback){
    console.log(orderid)
    callback("transcid12345")

}
function displayStatus(paymentid,callback){
    callback("fetched all payemt details and order details ")
}


createOrderApi("pepejeans",function(orderid){
    proceedToPayment(orderid,function(paymentinfo){
        displayStatus(paymentinfo,function(data){
            console.log(data)
        })
    })
})


function createOrderApi(cart,callback){
    //logic
    let orderid="12345"
    callback(orderid)
}