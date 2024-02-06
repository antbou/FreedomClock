import { FC } from "react";
import { Container, Sprite } from "@pixi/react";
import ImmobilizedSoldier from "@/assets/NES_Title_Screen.png";

interface DefaultSoldierProps {
  visible: boolean;
}

export const DefaultSoldier: FC<DefaultSoldierProps> = ({ visible }) => {
  return (
    <Container visible={visible}>
      <Sprite image={ImmobilizedSoldier} scale={0.4} y={-15} />
    </Container>
  );
};
