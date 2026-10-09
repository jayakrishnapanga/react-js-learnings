import "../css/resturantContainer.css"
const ResturantCard=(props)=>{
    console.log(props.resdata.length)
   return(
        props.resdata.map((resturant)=>(
            <div className="resturantcard" id={resturant.info.id} >
                <h4>{resturant.info.name}</h4>
                
                <img className="resturantImg" src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${resturant.info.cloudinaryImageId}`} alt="resturantImg"></img>
                <h2></h2>
                <h6>cuisines:{resturant.info.cuisines.join(",")}</h6>
                <h6>avgRating:{resturant.info.avgRating}</h6>
            </div>
            )
        )
   )
    
}
export default ResturantCard