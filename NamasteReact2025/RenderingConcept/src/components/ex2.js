// https://codesandbox.io/p/sandbox/batched-update-snippet1-4wuk8?file=%2Fsrc%2Findex.js

import React, { Fragment, useState } from "react";
export function ComponentPromises_stateupdate2() {
  const [item1, setItem1] = useState("Initial Item 1");
  const [item2, setItem2] = useState("Initial Item 2");

  console.log("render: ", item1, item2);

  // Without unstable_batchedUpdates
  function handleClickWithPromise() {
    Promise.resolve().then(() => {
      setItem1("Updated Item 1");
      setItem2("Updated Item 2");
    });
  }

  // React automatically batches updates
  function handleClickWithoutPromise() {
    setItem1("Updated Item 1");
    setItem2("Updated Item 2");
  }

  return (
    <Fragment>
      <button onClick={handleClickWithPromise}>
        {item1} - {item2} (with promise)
      </button>

      <button onClick={handleClickWithoutPromise}>
        {item1} - {item2} (without promise)
      </button>
    </Fragment>
  );
}