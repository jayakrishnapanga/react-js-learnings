// these are perfectly valid javascript functions
const fn=()=> true

const fn2=()=>{
    return true
}
const fn3=()=>(
       true
)
function fn4(){
   true
}
// same like that 
const HeadiingComponent= ()=> <h1> helloo</h1>

const HeadiingComponent2= ()=>{
    return <h1> helloo</h1>
}
const HeadiingComponent3= ()=>(
    <h1> helloo</h1>
)
function HeadiingComponent4(){
    return <h1> helloo</h1>
}

// these are perfectly valid functional components





// const fn1=()=> {true}
// ❌ Invalid Function (fn1)

const fn1 = () => { true };
// Here, {} creates a block, but there is no return statement, so the function implicitly returns undefined. 
// To fix it:
// const fn1 = () => ({ true }); // Wrap in parentheses to return an object (not needed here)
// const fn1 = () => true; // Correct

// const HeadiingComponent1= ()=>{ <h1> helloo</h1>}
// ❌ Invalid Functional Component (HeadiingComponent1)

const HeadiingComponent1 = ()=>{ <h1> helloo</h1> }
// This is incorrect because {} creates a block, and there is no return, so the function returns undefined.

// ✅ Fix it like this:
// const HeadiingComponent1 = () => (<h1> helloo</h1>);