import { Sprite, useTick } from "@pixi/react";
import { useState } from "react";
import image from "@/assets/IaUrttj.png";

let i = 0;

export const Soldier = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rotation, setRotation] = useState(0);

  // custom ticker
  useTick((delta) => {
    i += 0.05 * delta;

    setX(Math.sin(i) * 100);
    setY(Math.sin(i / 1.5) * 1060);
    setRotation(-10 + Math.sin(i / 10 + Math.PI * 2) * 10);
  });

  return <Sprite image={image} anchor={0.5} x={x} y={y} rotation={rotation} />;
};
