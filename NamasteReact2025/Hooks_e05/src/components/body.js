import ResturantCard from "./resturantCard";
import {restaurantData} from "../mocks/data";
import { useState } from "react";
export const Body = () => {
   const[data,setData]=useState(restaurantData)
  return (
    <div className="appBody">
      <div>search</div>
      <div className="resturantContainer">
        <ResturantCard resdata={data.restaurants}/>
      </div>
    </div>
  );
};
