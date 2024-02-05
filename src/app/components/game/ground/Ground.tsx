import { FC, useState } from "react";
import { TilingSprite, Container, useTick } from "@pixi/react";
import SpriteImage from "@/assets/sprite.png";
import { SOLDIER_POSITION } from "@/app/globals/constants";

interface GroundProps {
  gameSpeed: number;
}

export const Ground: FC<GroundProps> = ({ gameSpeed }) => {
  const [xBackground, setXBackground] = useState(-1);

  useTick(() => {
    setXBackground(xBackground - gameSpeed * 0.3);
  }, gameSpeed > 0);

  return (
    <Container position={[0, SOLDIER_POSITION.Y + 20]}>
      <TilingSprite
        width={960}
        height={42}
        image={SpriteImage}
        tilePosition={{ x: xBackground, y: SOLDIER_POSITION.Y + 8 }}
      />
    </Container>
  );
};
