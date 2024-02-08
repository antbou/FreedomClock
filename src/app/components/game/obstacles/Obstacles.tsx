import { Container, useTick } from "@pixi/react";
import Boots from "@/assets/KS.png";
import { FC, useCallback, useContext, useMemo, useState } from "react";
import {
  GAME_SIZE,
  GROUND_SPEED,
  SOLDIER_POSITION,
} from "@/app/globals/constants";
import { AppContext } from "@/app/globals/context";
import Fas from "@/assets/fas90.png";
import { Obstacle } from "./Obstacle";

interface ObstaclesProps {}

export const Obstacles: FC<ObstaclesProps> = () => {
  const { gameSpeed } = useContext(AppContext);
  const [obstacles, setObstacles] = useState<{ type: string; x: number }[]>([]);

  const obstacleConfigurations = useMemo(
    () => [
      {
        type: "boots",
        image: Boots,
        yPosition: 20,
        scale: 1.5,
        rotation: 0,
      },
      {
        type: "fas",
        image: Fas,
        yPosition: 65,
        scale: 0.55,
        rotation: 1.5 * Math.PI,
      },
    ],
    []
  );

  const minDistanceBetweenObstacles = 175;
  const maxNumberOfObstacles = 1;

  const calculateObstacleCreationProbability = useCallback(() => {
    const baseProbability = 0.02;
    const exponentFactor = 0.005;

    return baseProbability * Math.exp(exponentFactor * gameSpeed);
  }, [gameSpeed]);

  useTick((delta) => {
    setObstacles((prevObstacles) =>
      prevObstacles.map((obstacle) => ({
        ...obstacle,
        x: obstacle.x - gameSpeed * GROUND_SPEED * delta,
      }))
    );

    // Remove obstacles that are off the screen
    setObstacles((prevObstacles) =>
      prevObstacles.filter((obstacle) => obstacle.x > -50)
    );

    const lastObstacle =
      obstacles.length > 0 ? obstacles[obstacles.length - 1] : null;
    const obstacleCreationProbability = calculateObstacleCreationProbability();

    const canCreateObstacle =
      !lastObstacle ||
      (lastObstacle.x <= GAME_SIZE.WIDTH - minDistanceBetweenObstacles &&
        Math.random() < obstacleCreationProbability &&
        obstacles.length < maxNumberOfObstacles);

    if (canCreateObstacle) {
      const randomConfiguration =
        obstacleConfigurations[
          Math.floor(Math.random() * obstacleConfigurations.length)
        ];

      setObstacles((prevObstacles) => [
        ...prevObstacles,
        { type: randomConfiguration.type, x: GAME_SIZE.WIDTH },
      ]);
    }
  }, gameSpeed > 0);

  return (
    <Container position={[0, SOLDIER_POSITION.Y]} zIndex={1}>
      {obstacles.map((obstacle, index) => {
        const config = obstacleConfigurations.find(
          (type) => type.type === obstacle.type
        );
        return (
          <Obstacle
            key={index}
            image={config?.image || ""}
            xPosition={obstacle.x || 0}
            yPosition={config?.yPosition || 0}
            scale={config?.scale || 1}
            rotation={config?.rotation || 0}
          />
        );
      })}
    </Container>
  );
};
