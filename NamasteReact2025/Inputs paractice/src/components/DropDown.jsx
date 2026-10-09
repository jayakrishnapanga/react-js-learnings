import { useState } from "react";

// function DropdownExample() {
//   const [selectedOption, setSelectedOption] = useState("");

//   function handleChange(e) {
//     setSelectedOption(e.target.value);
//   }

//   return (
//     <div>
//       <label>
//         Choose a fruit:
//         <select value={selectedOption} onChange={handleChange}>
//           <option value="">--Select--</option>
//           <option value="apple">Apple</option>
//           <option value="banana">Banana</option>
//           <option value="orange">Orange</option>
//         </select>
//       </label>
//       <p>Selected: {selectedOption}</p>
//     </div>
//   );
// }

// export default DropdownExample;

//  custom dropdown example
function DropdownExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Select an option");

  const options = ["Option 1", "Option 2", "Option 3"];

  return (
    <div style={{ position: "relative", width: "200px" }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{ border: "1px solid #ccc", padding: "8px", cursor: "pointer" }}
      >
        {selected}
      </div>

      {isOpen && (
        <ul
          style={{
            border: "1px solid #ccc",
            borderTop: "none",
            listStyle: "none",
            padding: 0,
            margin: 0,
            position: "absolute",
            width: "100%",
            background: "#fff",
          }}
        >
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
              style={{ padding: "8px", cursor: "pointer" }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropdownExample;
