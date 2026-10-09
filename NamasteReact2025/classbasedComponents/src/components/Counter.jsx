import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount } from "../store/counterSlice";

function Counter() {
  console.log("the counter component also rendered ")
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  function handleDecrement() {
    console.log("the valuse of decrement", decrement());
    dispatch(decrement());
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
