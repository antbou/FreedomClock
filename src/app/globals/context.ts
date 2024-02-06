import { createContext } from "react";
import { PixiObject } from "./interfaces";

interface AppContextTypes {
  gameSpeed: number;
  gameScore: number;
  gameOver: boolean;
  detectCollision: (ref: PixiObject) => void;
}

export const AppContext = createContext<AppContextTypes>({
  gameSpeed: 0,
  gameScore: 0,
  gameOver: false,
  detectCollision: () => {},
});
