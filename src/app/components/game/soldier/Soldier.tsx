import { FC, useContext, useEffect, useRef, useState } from "react";
import { Container, useTick } from "@pixi/react";
import { DefaultSoldier } from "./components/DefaultSoldier/DefaultSoldier";
import useKeyDown from "@hooks/useKeyDown";
import { RunningSoldier } from "./components/RunningSoldier/RunningSoldier";
import { JumpingSoldier } from "./components/JumpingSoldier/JumpingSoldier";
import { JUMP_STAGE } from "@/app/globals/enums";
import { SOLDIER_POSITION } from "@/app/globals/constants";
import { AppContext } from "@/app/globals/context";
import { PixiObject } from "@/app/globals/interfaces";

interface SoldierProps {
  setRef: (ref: PixiObject) => void;
}

let jumpProgress = 0;
export const Soldier: FC<SoldierProps> = ({ setRef }) => {
  const [jump, setJump] = useState<number>(JUMP_STAGE.DEFAULT);
  const [soldierYPos, setsoldierYPos] = useState<number>(SOLDIER_POSITION.Y);
  const { gameSpeed } = useContext(AppContext);
  const soldierRef = useRef<PixiObject>(null);

  useEffect(() => {
    if (soldierRef.current) {
      setRef(soldierRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soldierRef]);

  useKeyDown(() => {
    if (jump !== JUMP_STAGE.DEFAULT) return;

    setJump(JUMP_STAGE.START);
  }, ["Space", "ArrowUp"]);

  useTick(() => {
    if (jump === JUMP_STAGE.START) {
      const newYPos = soldierYPos - gameSpeed / 3;
      setsoldierYPos(newYPos);
      if (newYPos <= SOLDIER_POSITION.Y / 2 - 20) {
        setJump(JUMP_STAGE.END);
      }
    } else if (jump === JUMP_STAGE.END) {
      jumpProgress += 0.8;
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
    <Container
      zIndex={2}
      position={[SOLDIER_POSITION.X, soldierYPos]}
      ref={soldierRef}
    >
      <DefaultSoldier visible={gameSpeed === 0} />
      <RunningSoldier
        visible={gameSpeed > 0 && jump === JUMP_STAGE.DEFAULT}
        gameSpeed={gameSpeed}
      />
      <JumpingSoldier
        visible={jump !== JUMP_STAGE.DEFAULT}
        gameSpeed={gameSpeed}
      />
    </Container>
  );
};
