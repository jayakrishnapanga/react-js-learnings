// Let me explain Inversion of Control (IoC) in a simple way using a real-world analogy:
// Imagine you're at a restaurant. There are two ways this could work:

// Traditional Control (Without IoC):
// You walk into the kitchen, cook your own food, plate it, and serve yourself. You're in control of the entire process and its timing.
// Inversion of Control (With IoC):
// You sit at your table and give your order to the waiter. Then you hand over control to the restaurant. You don't know exactly when your food will arrive or how it's being prepared - you just know that the waiter will come back with your food when it's ready.

// Now, let's apply this to our code example:
function createOrderApi(cart, callback) {
    let orderId = "12345"
    callback(orderId)  // Like the waiter delivering your food
}
createOrderApi("pepejeans", function(orderId) {
    // This is like telling the waiter: "When my food is ready, 
    // please bring it to table 5"
    proceedToPayment(orderId, function(paymentInfo) {
        // This is like saying: "After I finish eating, 
        // please bring the bill"
        displayStatus(paymentInfo, function(data) {
            console.log(data)
        })
    })
})
// Breaking it down:
// Without IoC, our code would look like this:
let orderId = createOrder()
let payment = makePayment()
let status = checkStatus()
// We control everything directly

// With IoC (using callbacks):

createOrderApi("pepejeans", function(orderId) {
    // We're saying: "Here's what I want you to do when you're done"
    // Like leaving instructions with the restaurant
})
// The key differences:

// Without IoC: You're in charge of everything (like cooking your own meal)
// With IoC: You hand over control to someone else (like letting the restaurant handle everything)

// Benefits of IoC:

// Better separation of concerns (the restaurant handles cooking, you handle eating)
// More flexible (the kitchen can handle multiple orders efficiently)
// Better handling of asynchronous operations (you can do other things while waiting for your food)

// The downside we see in our code is "callback hell" - where we nest callbacks within callbacks (like saying "after the meal, after the dessert, after the coffee, bring the bill"). This is why modern JavaScript often uses Promises or async/await instead, but the concept of IoC remains the same.