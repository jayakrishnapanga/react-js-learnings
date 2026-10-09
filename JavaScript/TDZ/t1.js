// The term "temporal" is used because the zone depends on the order of execution (time) rather than the order in which the code is written (position).
//  For example, the code below works because, even though the function that uses the let variable appears before the variable is declared, the function is called outside the TDZ.

{
    // TDZ starts at beginning of scope
    const func = () => console.log(letVar); // OK
  
    // Within the TDZ letVar access throws `ReferenceError`
  
    let letVar = 3; // End of TDZ (for letVar)
    func(); // Called outside TDZ!
}
  