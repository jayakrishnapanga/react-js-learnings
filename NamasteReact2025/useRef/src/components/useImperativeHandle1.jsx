import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();
  const buttonRef = useRef();
  useImperativeHandle(ref, () => ({
    focusInput: () => inputRef.current.focus(),
    clearInput: () => (inputRef.current.value = ""),
    clickButton: () => buttonRef.current.click(),
  }));

  return (
    <div>
      <input ref={inputRef} placeholder="Type here..." />
      <button ref={buttonRef} onClick={() => alert("Button clicked!")}>
        Click Me
      </button>
    </div>
  );
});

export function ParentComponent() {
  const inputReffromparent = useRef(null);
  useEffect(() => {
    inputReffromparent.current.focusInput();
  }, []);
  return (
    <div>
      <FancyInput ref={inputReffromparent} />
      <button onClick={() => inputReffromparent.current.clearInput()}>
        clear
      </button>
    </div>
  );
}
