import { Game as GameComponent } from "@components/game/Game";

function Game() {
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
      <GameComponent />
    </div>
  );
}

export default Game;
