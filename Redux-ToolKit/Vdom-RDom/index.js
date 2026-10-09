import { createStore } from "./redux.js";
console.log(typeof createStore);

function reducer(state, action) {
  if (action.type == "increment") {
    console.log(action, state);
    return { count: state.count + 1 };
  }
  return { count: 0 };
}
const store = createStore(reducer);
console.log(typeof store);
store.subscribe(JkSubscriber);
const button = document.getElementById("btn");

button.addEventListener("click", (e) => {
  store.dispatch({ type: "increment" });
  console.log("state after dispatch", store.getState());
});

function JkSubscriber() {
  console.log("scriber lostened to increment event ");
  console.log(
    "subscriber is called after updating the state",
    store.getState()
  );
}
