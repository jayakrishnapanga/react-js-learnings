setTimeout(() => {
    console.log('timer1');
    Promise.resolve().then(() => console.log('promise inside timer1'));
  }, 0);
  
setTimeout(() => {
    console.log('timer2');
}, 0);