// // import ResturantCard from "./resturantCard";
// // import {restaurantData} from "../mocks/data";
// // import { useEffect, useState } from "react";
// export const Body = () => {
  // for useEffect understanding
  //  const[data,setData]=useState(restaurantData)
  //  const[user,setUser]=useState("")
  //  useEffect(()=>{
  //    console.log("hello i am useEffect")
  //    setUser("jk")
  //  },[])
  // return (
  //   <div className="appBody">
  //     <div className="resturantContainer">
  //       <ResturantCard resdata={data.restaurants}/>
  //     </div>
  //   </div>
  // );
// };


// understand the behaviour of the useeffect whether it will call the useeffect if the state is update inside the useEffect but we are not passing the state in the dependency array 
// when it is rendered it will call the useeffect or not 

// https://legacy.reactjs.org/docs/hooks-reference.html#cleaning-up-an-effect


import React, { useEffect, useState } from 'react';

// ex2 imp understand this
// with cleanup
const SimpleEventListener = () => {
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    console.log('🐛 EFFECT RUN: Added click listener');

    const handleClick = () => {
      console.log('🖱️ Click detected!');
      setClickCount(c => c + 1);
    };

    document.addEventListener('click', handleClick);

    // Cleanup function
    return () => {
      console.log('🧹 CLEANUP: Removed click listener');
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div style={{ padding: '20px', border: '1px solid red' }}>
      <h2>Click Counter</h2>
      <p>Try clicking anywhere on the page!</p>
      <p>Click count: {clickCount}</p>
    </div>
  );
};

// ex2 without cleanup
// const LeakyComponent = () => {
//   const [clicks, setClicks] = useState(0);
//    console.log('🐛 EFFECT RUN: Added click listener (no cleanup)');
//   useEffect(() => {
//     console.log('🔴 ATTACHING click listener (no cleanup)');
//     const handleClick = () => {
//       setClicks(c => c + 1);
//       console.log('🖱️ Click counted (leaking!)');
//     };
//     document.addEventListener('click', handleClick);
    
//     // 🚨 Missing cleanup function!
//   }, []);

//   return <div style={{ padding: '20px', background: 'pink' }}>
//     <h3>Leaky Counter: {clicks}</h3>
//     <p>This component leaks event listeners!</p>
//   </div>;
// };

export const Body= () => {
  const [showComponent, setShowComponent] = useState(true);

  return (
    <div style={{ padding: '40px' }}>
      <button onClick={() => setShowComponent(!showComponent)}>
        {showComponent ? 'Remove' : 'Show'} Component
      </button>
      {showComponent && <SimpleEventListener />}
      {/* {showComponent && <LeakyComponent/>} */}
    </div>
  );
};



// How to Test and Understand:
// First Load:

// You'll see 🐛 EFFECT RUN: Added click listener in console

// Click anywhere - see 🖱️ Click detected! and counter increases

// When Removing Component:

// Click the "Remove Component" button

// You'll see 🧹 CLEANUP: Removed click listener in console

// Now clicks won't increment the counter (listener is gone)

// When Adding Back:

// Click "Show Component"

// The effect runs again (🐛 EFFECT RUN...)

// Clicks will work again

// Key Points Illustrated:
// Setup: The effect runs once when component mounts (empty [] dependencies)

// Cleanup: The function you return runs when component unmounts

// Without Cleanup: If you remove the cleanup function, clicks would still work even after component is gone (memory leak!)

// Visual Feedback: The console logs show exactly when things happen

// This is the simplest way to see the "setup → cleanup" cycle in action!



// ex3
// import DataDisplayer from "./dataDisplayer";
// export const Body= () => {
//   const [currentId, setCurrentId] = useState(null);

//   const handleClick = () => {
//     const idToFetch = Math.round(Math.random() * 80);
//     setCurrentId(idToFetch);
//   };

//   return (
//     <React.Fragment>
//       <div>
//         {currentId ? <p>Latest requested ID: {currentId}</p> : null}

//         <button type="button" onClick={handleClick}>
//           Fetch data!
//         </button>
//       </div>
//       <hr />
//       {currentId ? <DataDisplayer id={currentId} /> : null}
//     </React.Fragment>
//   );
// };

