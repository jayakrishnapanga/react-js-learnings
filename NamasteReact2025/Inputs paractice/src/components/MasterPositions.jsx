import "../css/positions.css";
// export default function MasterPositions() {
//   return (
//     <div class="parent">
//       <div class="child">Absolute Child</div>
//     </div>
//   );
// }


import "../css/positions.css";

export default function MasterPositions() {
  return (
    <div className="page">
      <h2>CSS Position Playground</h2>

      {/* STATIC */}
      <div className="box-container">
        <h3>1. position: static (default)</h3>
        <div className="parent static-parent">
          <div className="child static-child">Static</div>
        </div>
      </div>

      {/* RELATIVE */}
      <div className="box-container">
        <h3>2. position: relative</h3>
        <div className="parent relative-parent">
          <div className="child relative-child">Relative</div>
        </div>
      </div>

      {/* ABSOLUTE */}
      <div className="box-container">
        <h3>3. position: absolute (inside relative parent)</h3>
        <div className="parent absolute-parent">
          <div className="child absolute-child">Absolute</div>
        </div>
      </div>

      {/* FIXED */}
      <div className="box-container">
        <h3>4. position: fixed (scroll the page)</h3>
        <div className="parent fixed-parent">
          <div className="child fixed-child">Fixed</div>
        </div>
      </div>

      {/* STICKY */}
      <div className="box-container tall">
        <h3>5. position: sticky (scroll inside parent)</h3>
        <div className="parent sticky-parent">
          <div className="child sticky-child">Sticky</div>
          <p>Scroll inside this box ⬇️</p>
          {[...Array(20)].map((_, i) => (
            <p key={i}>Content line {i + 1}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
