import { createContext } from "react";

interface AppContextTypes {
  gameSpeed: number;
  gameScore: number;
  gameOver: boolean;
}

export const AppContext = createContext<AppContextTypes>({
  gameSpeed: 0,
  gameScore: 0,
  gameOver: false,
});
