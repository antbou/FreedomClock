import { FC, useEffect, useState } from "react";
import { AnimatedSprite, Container } from "@pixi/react";
import { Assets, Resource, Texture } from "pixi.js";
interface DeadSoldierProps {
  visible: boolean;
}

export const DeadSoldier: FC<DeadSoldierProps> = ({ visible }) => {
  const [frames, setFrames] = useState<Texture<Resource>[]>([]);

  useEffect(() => {
    // the loader will never load things more than once
    Assets.load("/dead-character.json").then((data): void => {
      const textures = data.textures;
      setFrames(
        Object.keys(textures).map((key: string) => {
          return textures[key];
        })
      );
    });
  }, []);

  if (frames.length === 0) {
    return null;
  }

  return (
    <Container visible={visible}>
      <AnimatedSprite
        isPlaying={visible}
        textures={frames}
        scale={2.5}
        y={-15}
        loop={false}
        animationSpeed={0.3}
      />
    </Container>
  );
};
