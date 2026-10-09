import React from "react";
import { useSelector, useDispatch } from "react-redux";

// 🔁 Import actions from vanilla Redux version
import {
  increment,
  decrement,
  incrementByAmount,
} from "../redux/reducers/counterReducer";

function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  function handleDecrement() {
    dispatch(decrement()); // logs: { type: "DECREMENT" }
  }

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleDecrement}>-</button>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
    </div>
  );
}

export default Counter;
