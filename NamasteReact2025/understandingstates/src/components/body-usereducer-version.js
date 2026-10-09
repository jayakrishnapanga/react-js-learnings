import { useReducer } from "react";
function reducer(state, action) {
  switch (action.type) {
    case "add":
      return { user: [...state.user, action.payload] };
    case "remove":
      return { user: state.user.filter((item) => item !== action.payload) };
    default:
      return state;
  }
}
export const BodyuseReducerversion = () => {
  let initialState = {
    user: ["user1", "user2", "user3"],
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  handleclick = async () => {
    dispatch({ type: "add", payload: "user4" });
    await new Promise((resolve) => setTimeout(resolve, 10000));
    dispatch({ type: "add", payload: "user5" });
    await new Promise((resolve) => setTimeout(resolve, 10000));
    dispatch({ type: "add", payload: "user6" });
  };
  return (
    <div className="appBody">
      <button onClick={handleclick}>Click me</button>
      <div>
        {state.user.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </div>
    </div>
  );
};



// How state updates happen in useReducer
// Under the hood, useReducer works something like this:

// function useReducer(reducer, initialState) {
//   const [state, setState] = useState(initialState);

//   const dispatch = (action) => {
//     setState((prevState) => reducer(prevState, action));
//   };

//   return [state, dispatch];
// }
