// import { useRef,useState } from "react";

// export function StopWatch() {
//     const [startTime, setStartTime] = useState(0);
//     const [now, setNow] = useState(0);
//     const intervalref = useRef(null);
//     handleStart = () => {
//         setStartTime(Date.now());
//         intervalref.current = setInterval(() => {
//             setNow(Date.now());
//         }, 10);
//     }
//     handleStop = () => {
//         clearInterval(intervalref.current);
//         intervalref.current = null;
//     }
//     let secondsPassed = 0;
//     if (startTime != null && now != null) {
//         secondsPassed = (now - startTime)/1000; ;
//     }
//     console.log(secondsPassed);
//   return (
//     <div>
//       <h1>Stop Watch</h1>
//       <p>Stop Watch Component</p>
//       <button onClick={handleStart}>Start</button>
//       <button onClick={handleStop}>Stop</button>
//       <h2> seconds passed {secondsPassed.toFixed(3)} seconds</h2>
//     </div>
//   );
// }

// import { useRef, useState } from "react";

// export function StopWatch() {
//   const [startTime, setStartTime] = useState(0);
//   const [now, setNow] = useState(0);
//   const intervalRef = useRef(null);
//   const isPaused = useRef(false);

//   const handleStart = () => {
//     setStartTime(Date.now());
//     setNow(Date.now());
//     clearInterval(intervalRef.current);
//     intervalRef.current = setInterval(() => {
//       setNow(Date.now());
//     }, 10);
//   };

//   const handleStop = () => {
//     clearInterval(intervalRef.current);
//     intervalRef.current = null;
//   };
//   const handlePause=()=>{
//     if(isPaused.current) {
//       isPaused.current = false;
//       intervalRef.current = setInterval(() => {
//         setNow(Date.now());
//       }, 10);
//     }
//     else {
//       isPaused.current = true;
//       clearInterval(intervalRef.current);
//     }

//   }

//   let timeDiff = now - startTime;
//   console.log("Time difference in milliseconds:", timeDiff);
//   // Convert milliseconds into m:s:ms
//   const minutes = Math.floor(timeDiff / 60000);
//   const seconds = Math.floor((timeDiff % 60000) / 1000);
//   const milliseconds = Math.floor((timeDiff % 1000) / 10); // to show 2-digit ms

//   const formatTime = (value) => value.toString().padStart(2, "0");

//   return (
//     <div>
//       <h1>Stop Watch</h1>
//       <button onClick={handleStart}>Start</button>
//       <button onClick={handleStop}>Stop</button>
//       <button
//         onClick={() => {
//           clearInterval(intervalRef.current);
//           setStartTime(0);
//           setNow(0);
//         }}
//       >
//         Reset
//       </button>
//       <button onClick={handlePause}>pause</button>
//       <h2>
//         Time Passed: {formatTime(minutes)}:{formatTime(seconds)}:
//         {formatTime(milliseconds)}
//       </h2>
//     </div>
//   );
// }
import { useRef, useState } from "react";

export function StopWatch() {
  const [elapsedTime, setElapsedTime] = useState(0); // in ms
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  const handleStart = () => {
    if (isRunning) return;
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
    intervalRef.current = setInterval(() => {
      setElapsedTime(Date.now() - startTimeRef.current);
    }, 10);
  };

  const handlePause = () => {
    if (!isRunning) return;
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const handleStop = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setElapsedTime(0);
    startTimeRef.current = null;
  };

  const minutes = Math.floor(elapsedTime / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);

  const formatTime = (value) => value.toString().padStart(2, "0");

  return (
    <div>
      <h1>Stop Watch</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
      <h2>
        Time Passed: {formatTime(minutes)}:{formatTime(seconds)}:
        {formatTime(milliseconds)}
      </h2>
    </div>
  );
}
