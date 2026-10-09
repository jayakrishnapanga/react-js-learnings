const heading= React.createElement("h2",{},"Namaste from jayakrishina and biswajit using React")
const root =ReactDOM.createRoot(document.getElementById("root"))
root.render(heading)
console.log(heading)
// heading is not a tag or html element  it is an object
// it is a react element react element is an object

// React.createElement(agr1,arg2,arg3)
// arg1 - the tag which you want to create 
// arg2  {} it is an object  we can pass the attributes to the component
// arg3  the content which you want to write in the tag 