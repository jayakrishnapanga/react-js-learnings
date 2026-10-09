import { Navbar } from "./navbar"
import "../css/header.css";
const Header=()=>{
    return(
        <div className="header" >
            <div>
                <img className="headerlogo" alt="headerlogo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpFxG0Nif81KRl-MkAebphPxJ-yUM9g_rEcA&s"></img>
            </div>
            <Navbar/>
        </div>
    )
}
export default Header