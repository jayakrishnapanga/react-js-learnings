import React from "react"
import ReactDOM from "react-dom/client"

// {} you can write any piece of javascript code in the curly braces
// {Title()} even you can call a componnet also because the functional component is a jsut normal function
const Title=()=>{
    return<h1> hello jk</h1>
}
const HeadingComponent=()=>{
    return(
        <div id="heading">
            {/* {1000} */}
            {/* {console.log("hello man")} */}
            {"hello"+" "+"akshay saini"}
            {200+5990}
            {Title()}
          <h2>hello we are using javascript inside the component</h2>
        </div>
    )
}

const root=ReactDOM.createRoot(document.getElementById("root"))

root.render(<HeadingComponent/>)

