
// https://codesandbox.io/p/sandbox/402pn5l989?file=%2Fsrc%2Findex.js

import React, { Fragment, useState } from 'react';
export function ComponentPromises_stateupdate1() {
    const [a, setA] = useState('a');
    const [b, setB] = useState('b');
    console.log('a', a);
    console.log('b', b);
  
    function handleClickWithPromise() {
      Promise.resolve().then(() => {
        setA('aa');
        setB('bb');
      });
    }
  
    function handleClickWithoutPromise() {
      setA('aa');
      setB('bb');
    }
  
    return (
      <Fragment>
        <button onClick={handleClickWithPromise}>
          {a}-{b} with promise
        </button>
        <button onClick={handleClickWithoutPromise}>
          {a}-{b} without promise
        </button>
      </Fragment>
    );
  }