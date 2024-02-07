import { FC, useEffect, useState } from "react";
import { AnimatedSprite, Container } from "@pixi/react";
import { Texture, Resource, Assets } from "pixi.js";
import { ANIMATION_SPEED } from "@/app/globals/constants";

interface RunningSoldierProps {
  visible: boolean;
  gameSpeed: number;
}

export const RunningSoldier: FC<RunningSoldierProps> = ({
  visible,
  gameSpeed,
}) => {
  const [frames, setFrames] = useState<Texture<Resource>[]>([]);
  const [animationSpeed, setAnimationSpeed] = useState<number>(ANIMATION_SPEED);
  useEffect(() => {
    Assets.loader.parsers;
    Assets.load("/running-character.json").then((data): void => {
      const textures = data.textures;
      setFrames(
        Object.keys(textures).map((key: string) => {
          return textures[key];
        })
      );
    });
  }, []);

  useEffect(() => {
    // Increase animation speed every 20 game speed
    if (gameSpeed % 20 === 0 && animationSpeed < 0.1) {
      setAnimationSpeed(animationSpeed + 0.01);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameSpeed]);

  if (frames.length === 0) {
    return null;
  }

  return (
    <Container visible={visible}>
      <AnimatedSprite
        animationSpeed={animationSpeed}
        isPlaying={true}
        textures={frames}
        scale={2}
      />
    </Container>
  );
};
