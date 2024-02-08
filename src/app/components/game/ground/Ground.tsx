import { FC, useContext, useState } from "react";
import { TilingSprite, Container, useTick } from "@pixi/react";
import SpriteImage from "@/assets/sprite.png";
import { GROUND_SPEED, SOLDIER_POSITION } from "@/app/globals/constants";
import { AppContext } from "@/app/globals/context";

interface GroundProps {}

export const Ground: FC<GroundProps> = () => {
  const [xBackground, setXBackground] = useState(-1);
  const { gameSpeed } = useContext(AppContext);

  useTick((delta) => {
    setXBackground(xBackground - gameSpeed * GROUND_SPEED * delta);
  }, gameSpeed > 0);

  return (
    <Container position={[0, SOLDIER_POSITION.Y + 29]}>
      <TilingSprite
        width={960}
        height={42}
        image={SpriteImage}
        tilePosition={{ x: xBackground, y: 41 }}
      />
    </Container>
  );
};
