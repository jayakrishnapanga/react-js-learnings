import { useState } from "react";

export function CheckBox() {
  let [isChecked, setIsChecked] = useState(false);
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => setIsChecked((prev) => !prev)}
        />
        I agree to the Terms & Conditions
      </label>
      <p>{isChecked ? "✅ Accepted" : "❌ Not accepted"}</p>
    </div>
  );
}
