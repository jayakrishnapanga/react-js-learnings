import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter", // Name of the slice
  initialState: { value: 0 }, // Initial state

  reducers: {
    increment: (state, action) => {
      console.log("action recieved", action);
      console.log("state",state)
      state.value += 1; // allowed because of Immer (mutable syntax)
    },
    decrement: (state, action) => {
      console.log("action recieved", action);
      console.log("state",state)
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload; // payload passed to action
    },
  },
});

// Export the auto-generated actions

// console.log("the value of CounterSLice", counterSlice);
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
// console.log(increment());
// Export the reducer to include in the store
// export default counterSlice.reducer;

const originalCounterReducer = counterSlice.reducer;
const wrappedCounterReducer = (state, action) => {
  console.log("counter reducer invoked with action:", action.type);
  return originalCounterReducer(state, action);
};

export default wrappedCounterReducer;
