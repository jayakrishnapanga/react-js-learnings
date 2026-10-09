import React, { useState } from "react";

export function RadioExample() {
  const [gender, setGender] = useState("");
  // ex1
  //   return (
  //     <div>
  //       <label>
  //         <input
  //           type="radio"
  //           name="gender"
  //           value="male"
  //           checked={gender === "male"}
  //           onChange={(e) => setGender(e.target.value)}
  //         />
  //         Male
  //       </label>

  //       <label>
  //         <input
  //           type="radio"
  //           name="gender"
  //           value="female"
  //           checked={gender === "female"}
  //           onChange={(e) => setGender(e.target.value)}
  //         />
  //         Female
  //       </label>

  //       <p>Selected: {gender}</p>
  //     </div>
  //   );

  // ex2
  return (
    <div>
      {/* Using htmlFor + id */}
      <label htmlFor="male">Male</label>
      <input
        id="male"
        type="radio"
        name="gender"
        value="male"
        checked={gender === "male"}
        onChange={(e) => setGender(e.target.value)}
      />

      {/* Wrapped version (no htmlFor needed) */}
      <label>
        <input
          type="radio"
          name="gender"
          value="female"
          checked={gender === "female"}
          onChange={(e) => setGender(e.target.value)}
        />
        Female
      </label>
    </div>
  );

  //  ex2
  // const [gender, setGender] = useState("male");
  // filedset bydefault gaa border add chessthadhi
  // legend tag gives title feel and sit on the border
  // return (
  //   <form>
  //     <fieldset>
  //       <legend>Select Gender</legend>

  //       <label htmlFor="male">
  //         <input
  //           type="radio"
  //           id="male"
  //           name="gender"
  //           value="male"
  //           checked={gender === "male"}
  //           onChange={(e) => setGender(e.target.value)}
  //           required
  //         />
  //         Male
  //       </label>

  //       <label htmlFor="female">
  //         <input
  //           type="radio"
  //           id="female"
  //           name="gender"
  //           value="female"
  //           checked={gender === "female"}
  //           onChange={(e) => setGender(e.target.value)}
  //         />
  //         Female
  //       </label>

  //       <button type="submit">Submit</button>
  //     </fieldset>
  //   </form>
  // );
}
