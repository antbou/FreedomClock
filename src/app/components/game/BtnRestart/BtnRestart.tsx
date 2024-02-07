import { FC } from "react";
import { Sprite, Container } from "@pixi/react";
import { Texture, Rectangle, BaseTexture } from "pixi.js";
import SpriteImage from "@/assets/sprite.png";
import { GAME_SIZE } from "@/app/globals/constants";

interface BtnRestartProps {
  restartGame: () => void;
}

export const BtnRestart: FC<BtnRestartProps> = ({ restartGame }) => {
  const width = 70;
  const baseTexture = new BaseTexture(SpriteImage);
  const cropRect = new Rectangle(0, 0, width, 65);
  const croppedTexture = new Texture(baseTexture, cropRect);

  return (
    <Container position={[(GAME_SIZE.WIDTH - width) / 2, 50]}>
      <Sprite
        interactive
        texture={croppedTexture}
        cursor="pointer"
        onclick={restartGame}
      />
    </Container>
  );
};
