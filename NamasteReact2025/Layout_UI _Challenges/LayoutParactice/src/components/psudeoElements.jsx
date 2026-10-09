// (Pseudo-class + Pseudo-element)
import "../css/psudoelements.css";

function PsudeoElements() {
  return (
    <div className="container">
      <h1 className="title">Pseudo Classes & Elements</h1>

      <button className="btn">Hover & Click Me</button>

      <input className="input" placeholder="Focus on me" />

      <ul className="list">
        <li>Item One</li>
        <li>Item Two</li>
        <li>Item Three</li>
        <li>Item Four</li>
      </ul>

      <p className="paragraph">
        this paragraph shows first-letter styling and before/after elements.
      </p>
    </div>
  );
}

export default PsudeoElements;
