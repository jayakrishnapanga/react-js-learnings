import { useRef, forwardRef, useEffect, useImperativeHandle } from "react";

// ✅ ChildComponent: uses forwardRef + useImperativeHandle
const ChildComponent = forwardRef((props, ref) => {
  const inputRef = useRef(); // Local ref for the actual DOM node

  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        inputRef.current.focus();
      },
      clear: () => {
        inputRef.current.value = ""; // ✅ Clear the input's value
      },
    };
  });

  return <input ref={inputRef} placeholder="Type something..." />;
});

// ✅ Parent: controls child input with focus & clear
export function ForwardRefDemo() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // 👈 Focus when component mounts
  }, []);

  const handleClear = () => {
    inputRef.current.clear(); // 👈 Calls the custom clear() method
  };

  return (
    <div>
      <ChildComponent ref={inputRef} />
      <button onClick={handleClear}>Clear Input</button>
    </div>
  );
}


// ************************** imp to understand this line 
// Wrap multiple elements but only expose one combined ref.
// **************************