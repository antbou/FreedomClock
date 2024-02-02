import { Soldier } from "./Soldier";
import { Stage, Container } from "@pixi/react";

export const Game = () => {
  return (
    <Stage
      width={800}
      height={300}
      options={{ autoDensity: true, backgroundAlpha: 1 }}
    >
      <Container x={150} y={150}>
        <Soldier />
      </Container>
    </Stage>
  );
};
