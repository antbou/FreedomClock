import { FC, useState } from "react";
import { Container, useTick } from "@pixi/react";
import { DefaultSoldier } from "./components/DefaultSoldier/DefaultSoldier";
import useKeyDown from "@hooks/useKeyDown";
import { RunningSoldier } from "./components/RunningSoldier/RunningSoldier";
import { JumpingSoldier } from "./components/JumpingSoldier/JumpingSoldier";
import { JUMP_STAGE } from "@/app/globals/enums";
import { SOLDIER_POSITION } from "@/app/globals/constants";

interface WalkingDinoProps {
  gameSpeed: number;
}

let jumpProgress = 0;
export const Soldier: FC<WalkingDinoProps> = ({ gameSpeed }) => {
  const [jump, setJump] = useState<number>(JUMP_STAGE.DEFAULT);
  const [soldierYPos, setsoldierYPos] = useState<number>(SOLDIER_POSITION.Y);

  useKeyDown(() => {
    if (jump !== JUMP_STAGE.DEFAULT) return;

    setJump(JUMP_STAGE.START);
  }, ["Space", "ArrowUp"]);

  useTick(() => {
    if (jump === JUMP_STAGE.START) {
      const newYPos = soldierYPos - 5;
      setsoldierYPos(newYPos);
      if (newYPos <= SOLDIER_POSITION.Y / 2 - 10) {
        setJump(JUMP_STAGE.END);
      }
    } else if (jump === JUMP_STAGE.END) {
      jumpProgress += 0.6;
      const newYPos = soldierYPos + jumpProgress;
      setsoldierYPos(newYPos);
      if (newYPos >= SOLDIER_POSITION.Y) {
        setsoldierYPos(SOLDIER_POSITION.Y);
        setJump(JUMP_STAGE.DEFAULT);
        jumpProgress = 0;
      }
    }
  }, gameSpeed > 0);

  return (
    <Container zIndex={2}>
      <DefaultSoldier visible={gameSpeed === 0} />
      <RunningSoldier
        visible={gameSpeed > 0 && jump === JUMP_STAGE.DEFAULT}
        gameSpeed={gameSpeed}
      />
      <JumpingSoldier
        visible={jump !== JUMP_STAGE.DEFAULT}
        gameSpeed={gameSpeed}
        yPosition={soldierYPos}
      />
    </Container>
  );
};
