import { GameCanvas } from "@/widgets/game-canvas";

function GamePage(): React.ReactElement {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center px-6 py-20">
      <GameCanvas />
    </div>
  );
}

export default GamePage;
