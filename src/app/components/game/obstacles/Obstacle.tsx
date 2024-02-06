import { AppContext } from "@/app/globals/context";
import { Sprite, useTick } from "@pixi/react";
import { FC, useContext, useRef } from "react";
import { Sprite as PixiJsSprite } from "pixi.js";

interface ObstacleProps {
  image: string;
  xPosition: number;
  yPosition: number;
  scale: number;
  rotation: number;
}
export const Obstacle: FC<ObstacleProps> = ({
  image,
  xPosition,
  yPosition,
  scale,
  rotation,
}) => {
  const obstacleRef = useRef<PixiJsSprite>(null);
  const detectCollision = useContext(AppContext).detectCollision;
  const gameSpeed = useContext(AppContext).gameSpeed;

  useTick(() => {
    if (obstacleRef.current) {
      detectCollision(obstacleRef.current);
    }
  }, gameSpeed > 0);

  return (
    <Sprite
      ref={obstacleRef}
      image={image}
      position={[xPosition, yPosition]}
      scale={scale}
      rotation={rotation}
    />
  );
};
