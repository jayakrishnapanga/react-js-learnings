// in globalspace this always refers to the global object, which is window in browsers and global in node.js. In strict mode, this is undefined in global scope.

function greet(){    
    console.log(this)
}

// output will window object in browser and global object in node.js