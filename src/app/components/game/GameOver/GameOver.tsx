import { FC } from "react";
import { Sprite, Container } from "@pixi/react";
import { Texture, Rectangle, BaseTexture } from "pixi.js";
import SpriteImage from "@/assets/sprite.png";
import { GAME_SIZE } from "@/app/globals/constants";

interface GameOverProps {}

export const GameOver: FC<GameOverProps> = () => {
  const width = 385;
  const baseTexture = new BaseTexture(SpriteImage);
  const cropRect = new Rectangle(950, 25, width, 30);
  const croppedTexture = new Texture(baseTexture, cropRect);

  return (
    <Container position={[(GAME_SIZE.WIDTH - width) / 2, 0]}>
      <Sprite texture={croppedTexture} />
    </Container>
  );
};
