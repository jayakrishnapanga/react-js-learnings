import { createContext } from "react";

export const LevelContext = createContext(1);
console.log("LevelContext created with default value 1",LevelContext);
console.log("LevelContext created with default value 1",LevelContext.Provider);
console.log("LevelContext created with default value 1",LevelContext.Consumer);
console.log("LevelContext created with default value 1",LevelContext.displayName);