import { useState } from "react";
export function InputField() {
  let [name, setName] = useState("");
  function handleinputChange(e) {
    console.log("event", e);
    setName(e.target.value);
  }
  return (
    <>
      <h1>paractise input field</h1>
      <label>name:</label>
      <input
        type="text"
        value={name}
        placeholder="hey type any thing you want "
        maxLength={5}
        minLength={2}
        onChange={(e) => {
          handleinputChange(e);
        }}
      />
      <br/>
      <label>email:</label>
      <input type="email" autoComplete="email" spellCheck={false} />
      <br/>
      <label>password:</label>
      <input type="pasword" minLength={5} maxLength={15} />
    </>
  );
}
