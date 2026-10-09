import React from "react"
import ReactDOM from "react-dom/client"


const Title=()=>{
    return<h1> hello jk</h1>
}

//this is called component composition 
//functional component inside another functional component is called as the component composition
//ways to add component 
{/* <Title/>
<Title></Title>
{<Title>} */}
const HeadingComponent=()=>{
    return(
        <div id="heading">
          <Title/>
          <h2>hello form namaste react </h2>
        </div>
    )
}

const root=ReactDOM.createRoot(document.getElementById("root"))

root.render(<HeadingComponent/>)


// <HeadingComponent/> 
// why we are using <>  for rendering the fucntional component
// but have not used for the react element you just passed 
// reason the babel understand that it is jsx code inside that fucitonal component  by seeing that <> that is the reason we are using that 