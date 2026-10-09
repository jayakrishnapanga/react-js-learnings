


// Lexical Environment:
// lexical Environment is the local memory along with the lexical environemtn of it's parent
// ex1:
function a(){
    c()
    function c(){     
        console.log(b)
    }
}
var b=10
a()

// understand output differences from ex1 and ex2 you can get clarity
ex2:
function a(){
    c()

    function c(){     
        console.log(b)
    }
}
a()
var b=10

