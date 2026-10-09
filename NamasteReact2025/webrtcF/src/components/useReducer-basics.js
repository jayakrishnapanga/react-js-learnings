// import { useReducer } from "react";

// function reducer(state, action) {
//     console.log("Reducer called with action:", action);
//     if(action.type === "ADD_USER") {
//         // console.log("Adding user:", ...state);
//         return {
//             ...state,
//             data: [...state.data, action.payload],
//             length: state.length + 1,
//         };
        
//     }
// }

// export function UseReducerBasics() {
//     console.log("rendering");
//   const initialState={
//     data: [
//       { id: 1, name: "John", age: 25 },
//       { id: 2, name: "satish", age: 30 },
//     ],
//     length: 2,
//   }
//   const [state, dispatch] = useReducer(reducer, initialState);
//   console.log("State:", state);
//   console.log("Dispatch:", dispatch);
//   return (
//     <div>
//       <h1>useReducer Basics</h1>
//       <p>length{state.data.length}</p>
//       {state.data.map((item) => (
//         <div key={item.id}>
//           <p>Name: {item.name}</p>
//           <p>Age: {item.age}</p>
//         </div>
//       ))}
//       <button onClick={() => dispatch({ type: "ADD_USER", payload: { name: "Doe", age: 28 } })}>
//         Add User
//       </button>
//       <button onClick={() => dispatch({ type: "REMOVE_USER", payload: { name: "John" } })}>
//         Remove User
//       </button>
//     </div>
//   );
// }




import { useReducer } from "react";

function reducer(state, action) {
    console.log("Reducer processing action:", action.type);
    switch(action.type) {
        case "ADD_USER":
            return {
                ...state,
                data: [...state.data, action.payload],
                length: state.length + 1,
            };
        case "REMOVE_USER":
            return {
                ...state,
                data: state.data.filter(user => user.name !== action.payload.name),
                length: state.length - 1,
            };
        default:
            return state;
    }
}

export function UseReducerBasics() {
    console.log("Component rendering");
    const initialState = {
        data: [
            { id: 1, name: "John", age: 25 },
            { id: 2, name: "Satish", age: 30 },
        ],
        length: 2,
    };
    
    const [state, dispatch] = useReducer(reducer, initialState);
    
    const handleMultipleDispatches = () => {
        console.log("-- Starting multiple dispatches --");
        dispatch({ type: "ADD_USER", payload: { id: 3, name: "Alice", age: 22 } });
        dispatch({ type: "ADD_USER", payload: { id: 4, name: "Bob", age: 35 } });
        dispatch({ type: "REMOVE_USER", payload: { name: "John" } });
        console.log("-- All dispatches called --");
    };
    const handleAsyncDispatches = async () => {
        dispatch({ type: "ADD_USER", payload: { id: 3, name: "Alice", age: 22 } });
        await new Promise(resolve => setTimeout(resolve, 10000));
        dispatch({ type: "ADD_USER", payload: { id: 4, name: "Bob", age: 35 } });
        dispatch({ type: "REMOVE_USER", payload: { name: "Satish" } });
    };
    
    return (
        <div>
            <h1>useReducer Basics</h1>
            <p>Users count: {state.length}</p>
            {state.data.map((item) => (
                <div key={item.id}>
                    <p>Name: {item.name}</p>
                    <p>Age: {item.age}</p>
                </div>
            ))}
            <button onClick={() => dispatch({ type: "ADD_USER", payload: { id: Date.now(), name: "New User", age: 30 } })}>
                Add Single User
            </button>
            <button onClick={handleMultipleDispatches}>
                Execute Multiple Dispatches
            </button>
            <button onClick={handleAsyncDispatches}>
                Execute Async Multiple Dispatches
            </button>
        </div>
    );
}