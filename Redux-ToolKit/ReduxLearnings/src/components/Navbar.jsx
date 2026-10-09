import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div
      className="navbar"
      style={{ display: "flex", justifyContent: "space-between",border:"1px solid black", width:"100%",height:"100px",padding:"5px",boxSizing:"border-box",alignItems:"center"}}
    >
      <div className="products">
        <Link to="/"style={{ textDecoration: "none" ,color: "inherit"}}>Products</Link>
      </div>
      <div className="products">
        <h2>ReduxLearning</h2>
      </div>
      <div>
        <Link to="/cart" style={{ textDecoration: "none",color: "inherit" }}>Cart</Link>
      </div>
    </div>
  );
}

export default Navbar;
