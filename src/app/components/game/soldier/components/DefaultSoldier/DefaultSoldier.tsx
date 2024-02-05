import { FC } from "react";
import { Container, Sprite } from "@pixi/react";
import ImmobilizedSoldier from "@/assets/NES_Title_Screen.png";
import { SOLDIER_POSITION } from "@/app/globals/constants";

interface DefaultSoldierProps {
  visible: boolean;
}

export const DefaultSoldier: FC<DefaultSoldierProps> = ({ visible }) => {
  return (
    <Container visible={visible}>
      <Sprite
        image={ImmobilizedSoldier}
        x={SOLDIER_POSITION.X - 20}
        y={SOLDIER_POSITION.Y - 20}
        scale={0.4}
      />
    </Container>
  );
};
