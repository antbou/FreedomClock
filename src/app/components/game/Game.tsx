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
import { GameOver } from "./GameOver/GameOver";
import { BtnRestart } from "./BtnRestart/BtnRestart";
import {
  getGameHighScoreToLocalStorage,
  setGameHighScoreToLocalStorage,
} from "@/app/globals/utils";

interface GameProps {
  restartGame: () => void;
}

export const Game = ({ restartGame }: GameProps) => {
  const [gameOver, setGameOver] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(0);
  const [score, setScore] = useState(0);
  const [soldierRef, setSoldierRef] = useState<PixiObject | null>(null);
  const [highScore] = useState(getGameHighScoreToLocalStorage());

  useKeyDown(() => {
    if (!gameOver) {
      setGameSpeed(GAME_SPEED.START);
    } else {
      handleResetBtn();
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
    if (gameOver) {
      if (score > highScore) {
        setGameHighScoreToLocalStorage(score);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver]);

  useEffect(() => {
    if (score > 0 && score % 200 === 0) {
      const newGameSpeed = gameSpeed + 1;
      setGameSpeed(newGameSpeed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score]);

  const detectCollision = (ref: PixiObject) => {
    const soldierBounds = soldierRef?.getBounds();
    const obstacleBounds = ref.getBounds();

    if (!obstacleBounds || !soldierBounds) return;

    if (
      soldierBounds.x < obstacleBounds.x + obstacleBounds.width - 5 &&
      soldierBounds.x + soldierBounds.width - 5 > obstacleBounds.x &&
      soldierBounds.y < obstacleBounds.y + obstacleBounds.height - 30 &&
      soldierBounds.y + soldierBounds.height - 30 > obstacleBounds.y
    ) {
      setGameOver(true);
      setGameSpeed(GAME_SPEED.DEFAULT);
    }
  };

  const handleResetBtn = () => {
    setGameOver(false);
    setGameSpeed(GAME_SPEED.DEFAULT);
    setScore(0);
    restartGame();
  };

  return (
    <Stage
      width={GAME_SIZE.WIDTH}
      height={GAME_SIZE.HEIGHT}
      options={{ antialias: false, background: "#ffffff", resizeTo: window }}
    >
      <Container sortableChildren={true}>
        <AppContext.Provider
          value={{
            gameSpeed: gameSpeed,
            gameScore: score,
            gameOver: gameOver,
            detectCollision: detectCollision,
          }}
        >
          <Soldier setRef={setSoldierRef} />
          <Obstacles />
          <Ground />
        </AppContext.Provider>
      </Container>
      <Container>
        <Text text={`Score: ${score}`} x={0} y={0} />
        <Text
          text={`Highest Score: ${highScore}`}
          x={GAME_SIZE.WIDTH - (highScore.toString().length + 20) * 10}
          y={0}
        />
      </Container>
      <Container visible={gameOver}>
        <GameOver />
        <BtnRestart restartGame={handleResetBtn} />
      </Container>
    </Stage>
  );
};
