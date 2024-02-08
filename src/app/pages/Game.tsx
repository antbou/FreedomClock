import { Game as GameComponent } from "@components/game/Game";
import useKeyDown from "@hooks/useKeyDown";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Game = () => {
  const [shouldRestart, setShouldRestart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (shouldRestart) {
      setShouldRestart(false);
    }
  }, [shouldRestart]);

  useKeyDown(() => {
    navigate("/");
  }, ["Escape"]);

  return (
    <div className="flex flex-col items-center w-full h-full gap-8 sm:gap-16">
      <div className="shadow-lg rounded-2xl p-4 w-full sm:w-1/2">
        <h1 className="text-4xl font-semibold text-gray-800">
          Run to escape 😱
        </h1>
        <p className="text-gray-600">
          Use the arrow keys to move and the spacebar to jump.
        </p>
      </div>
      {!shouldRestart ? (
        <GameComponent restartGame={() => setShouldRestart(true)} />
      ) : null}
    </div>
  );
};

export default Game;
