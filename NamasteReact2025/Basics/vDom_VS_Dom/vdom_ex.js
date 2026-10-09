// const heading= React.createElement("h2",{},"Namaste from jayakrishina and biswajit using React")
// const root =ReactDOM.createRoot(document.getElementById("root"))
// root.render(heading)
// console.log(heading)
// // heading is not a tag or html element  it is an object
// // it is a react element react element is an object

// // React.createElement(agr1,arg2,arg3)
// // arg1 - the tag which you want to create 
// // arg2  {} it is an object  we can pass the attributes to the component
// // arg3  the content which you want to write in the tag 

// Good: React batches updates
function List() {
    const [items, setItems] = useState([]);
  
    useEffect(() => {
      setItems(Array(1000).fill().map((_, i) => `Item ${i}`));
    }, []);
  
    return (
      <div>
        {items.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
    );
  }

//   const root =ReactDOM.createRoot(document.getElementById("root"))
//   root.render(<List/>)

ReactDOM.render(<List />, document.getElementById("root"));
