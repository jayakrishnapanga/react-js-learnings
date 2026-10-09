import Counter from "./components/Counter";
import User from "./components/user";
import UserClass from "./components/classbased";
import LifeCycleMethods from "./components/LifeCycleMethods";
function App() {
  return (
    <div className="app">
      <User />
      <Counter />
      <UserClass name={"satish "} />
      {/* <LifeCycleMethods /> */}
    </div>
  );
}

export default App;
