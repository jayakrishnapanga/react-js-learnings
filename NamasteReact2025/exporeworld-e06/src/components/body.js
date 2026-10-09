import ResturantCard from "./resturantCard";
import {restaurantData} from "../mocks/data";
import { useState,useEffect } from "react";
export const Body = () => {
   const[data,setData]=useState(restaurantData)
   useEffect(async ()=>{
      swiggpicallresturants=await fetch("api/siwggy/restaurants")
      const swiggydata=await swiggpicallresturants.json()
      console.log(swiggydata)
      setData(swiggydata)
      
   },[])
  return (
    <div className="appBody">
      <div>search</div>
      <div className="resturantContainer">
        <ResturantCard resdata={data.restaurants}/>
      </div>
    </div>
  );
};
