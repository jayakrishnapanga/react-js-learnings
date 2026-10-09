import React from "react"
import ReactDOM from "react-dom/client"
import Header from "./src/components/header"
import { Body } from "./src/components/body"
import { BodyuseReducerversion } from "./src/components/body-usereducer-version"
const AppLayOut= ()=>{
    return(
        <div className="app">
            <Header/>
            {/* <Body/> */}
            <BodyuseReducerversion/>
        </div>
    )
}
const root=ReactDOM.createRoot(document.getElementById("root"))

root.render(<AppLayOut/>)