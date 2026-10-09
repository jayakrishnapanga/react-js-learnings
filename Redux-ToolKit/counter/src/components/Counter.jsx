import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount } from "../store/counterSlice";

function Counter() {
  const count = useSelector((state) => state.counter.value);
  const userName = useSelector((state) => state.user.userName);
  // const user = useSelector((state) => state.user); // try the subscribing to user  and user.userName
  console.log("counter component is rendered ");
  const dispatch = useDispatch();
  function handleDecrement() {
    console.log("the valuse of decrement", decrement());
    dispatch(decrement());
  }

  return (
    <div>
      <h1>username:{userName}</h1>
      <h1>Count: {count}</h1>
      <button onClick={handleDecrement}>-</button>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
    </div>
  );
}

export default Counter;
