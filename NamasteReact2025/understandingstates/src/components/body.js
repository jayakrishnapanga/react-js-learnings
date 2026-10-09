// import ResturantCard from "./resturantCard";
// import { useState } from "react";
// export const Body = () => {
//   let userdata=["user1","user2","user3"];
//   let [user,setuser]=useState(userdata);
//   console.log(user);
  
//   handleclick = () => {
    
//     setuser([...user,"user4"]);
//   }
//   return (
//     <div className="appBody"> 
//      <button onClick={handleclick}>Click me</button>
//      <div>
//       {
//         user.map((item,index)=>{
//           return (
//             <li key={index}>{item}</li>
//           )
//         })
//       }
//      </div>
//     </div>
//   );
// };


// this is example  significes the importance of the use function if you are updating the state
// actually i thought output will be like this , when i click on the button once 
// user1
// user2
// user3
// user4
// user5
// user6
// i am getting this output 
// user1
// user2
// user3
// user6
import ResturantCard from "./resturantCard";
import { useState } from "react";
export const Body = () => {
  let userdata=["user1","user2","user3"];
  let [user,setuser]=useState(userdata);
  console.log(user);
  
  handleclick = async() => {
    
    setuser([...user,"user4"]);
    await new Promise((resolve) => setTimeout(resolve, 10000));
    setuser([...user,"user5"]);
    await new Promise((resolve) => setTimeout(resolve, 10000));
    setuser([...user,"user6"]);
  }
  return (
    <div className="appBody"> 
     <button onClick={handleclick}>Click me</button>
     <div>
      {
        user.map((item,index)=>{
          return (
            <li key={index}>{item}</li>
          )
        })
      }
     </div>
    </div>
  );
};
