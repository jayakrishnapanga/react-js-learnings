import { LevelContext } from "./LevelContext";
export function Section({level, children }) {
  
  return (
    <section className="section">
      <LevelContext.Provider value={level}>
           {children}
      </LevelContext.Provider>
    </section>
  );
}