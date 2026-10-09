var x=10
{
    console.log(x) // 10
    var x=20
    console.log(x) // 20    
}

console.log(x) // 20


// Why Shadowing Doesn't Apply
// Shadowing requires a new block-scoped variable to be declared inside a block or function, which hides the outer variable. However, var is function-scoped, not block-scoped, so it behaves differently:

// When you declare var x = 20; inside the block {}, it's not truly confined to the block. Instead, it "hoists" the declaration to the top of the function or global sco