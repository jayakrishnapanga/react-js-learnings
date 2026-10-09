import React, { useEffect, useState } from 'react';

const WindowResizeLogger = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    console.log('Effect RUNNING - adding event listener');

    const handleResize = () => {
      console.log('Resize event triggered');
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      console.log('Effect CLEANING UP - removing event listener');
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div>
      <h2>Window Size Tracker</h2>
      <p>Width: {windowSize.width}px</p>
      <p>Height: {windowSize.height}px</p>
      <p>Try resizing your browser window and watch the console!</p>
    </div>
  );
};

export default WindowResizeLogger;