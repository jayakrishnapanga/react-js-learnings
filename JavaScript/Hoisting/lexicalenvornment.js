


// Lexical Environment:
// lexical Environment is the local memory along with the lexical environemtn of it's parent
// ex1:
function a(){
    c()
    function c(){   
        d()  
        function d(){
            e()
           function e(){
               console.log(b)
           }
        }
    }
}
var b=10
a()


