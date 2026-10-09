import { useRef, forwardRef ,useEffect} from "react";

// ✅ ChildComponent: receives a ref and attaches it to its <input>
const ChildComponent = forwardRef((props, ref) => {
  return <input ref={ref} />;
});

// ✅ Parent: creates a ref and passes it to the child
export function ForwardRefDemo() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // 👈 Parent calls focus on child's <input>
  }, []);

  return <ChildComponent ref={inputRef} />;
}

//  How this works
// 1️ Parent creates inputRef using useRef.
// 2️ Parent passes it as ref={inputRef} to ChildComponent.
// 3️ ChildComponent uses forwardRef → now it receives the ref.
// 4️ Inside ChildComponent, the ref is attached to the real DOM node: <input ref={ref} />.
// 5️ useEffect in parent runs: inputRef.current.focus()

// the core use case for forwardRef:
// 👉 The parent directly controls or manipulates a DOM node that lives inside the child component.
