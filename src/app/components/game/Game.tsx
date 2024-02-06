import useKeyDown from "@hooks/useKeyDown";
import { Stage, Container, Text } from "@pixi/react";
import { AppContext } from "@/app/globals/context";
import { useEffect, useState } from "react";
import { GAME_SPEED } from "@/app/globals/enums";
import { GAME_SIZE } from "@/app/globals/constants";
import { Soldier } from "./soldier/Soldier";
import { Obstacles } from "./obstacles/Obstacles";
import { Ground } from "./ground/Ground";
import { PixiObject } from "@/app/globals/interfaces";

export const Game = () => {
  const [gameOver] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(0);
  const [score, setScore] = useState(0);
  const [soldierRef, setSoldierRef] = useState<PixiObject | null>(null);

  useKeyDown(() => {
    if (!gameOver) {
      setGameSpeed(GAME_SPEED.START);
    }
  }, ["Space", "ArrowUp"]);

  useEffect(() => {
    let intervalID: number;

    if (gameSpeed > GAME_SPEED.DEFAULT && !gameOver) {
      intervalID = setInterval(() => {
        const newScore = score + 1;
        setScore(newScore);
      }, 100);
    }

    return () => {
      clearInterval(intervalID);
    };
  }, [gameSpeed, gameOver, score]);

  useEffect(() => {
    if (score > 0 && score % 200 === 0) {
      const newGameSpeed = gameSpeed + 1;
      setGameSpeed(newGameSpeed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score]);

  return (
    <Stage
      width={GAME_SIZE.WIDTH}
      height={GAME_SIZE.HEIGHT}
      options={{ antialias: true, background: "#ffffff", resizeTo: window }}
    >
      <Container sortableChildren={true}>
        <AppContext.Provider
          value={{
            gameSpeed: gameSpeed,
            gameScore: score,
            gameOver: gameOver,
          }}
        >
          <Soldier setRef={setSoldierRef} />
          <Obstacles />
          <Ground />
        </AppContext.Provider>
      </Container>
      <Container>
        <Text text={`Score: ${score}`} x={0} y={0} />
      </Container>
    </Stage>
  );
};
