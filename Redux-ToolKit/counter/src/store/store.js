import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import  userReducer  from './userSlice';
const store = configureStore({
  reducer: {
    counter: counterReducer, // Key will be used in state as state.counter
    user:userReducer
  },
});
console.log("the value of the store ",store)
console.log("getState",store.getState())
export default store;
