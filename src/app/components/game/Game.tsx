import useKeyDown from "@hooks/useKeyDown";
import { Soldier } from "./soldier/Soldier";
import { Stage, Container } from "@pixi/react";
import { useState } from "react";
import { GAME_SPEED } from "@/app/globals/enums";
import { Ground } from "./ground/Ground";

export const Game = () => {
  const [gameOver, setGameOver] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(0);

  useKeyDown(() => {
    if (!gameOver) {
      setGameSpeed(GAME_SPEED.START);
    }
  }, ["Space", "ArrowUp"]);

  return (
    <Stage
      width={960}
      height={240}
      options={{ antialias: true, background: "#ffffff", resizeTo: window }}
    >
      <Container sortableChildren={true}>
        <Soldier gameSpeed={gameSpeed} />
        <Ground gameSpeed={gameSpeed} />
      </Container>
    </Stage>
  );
};
