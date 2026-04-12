import { useRef, useEffect } from "react";

function GameCanvas(): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return undefined;
    }

    let game: { destroy: (removeCanvas: boolean) => void } | undefined;
    let isCancelled = false;

    async function initGame(target: HTMLDivElement): Promise<void> {
      const { createGame } = await import("../lib/createGame");

      if (isCancelled) {
        return;
      }

      game = createGame(target);
    }

    initGame(container).catch((error: unknown) => {
      console.error("Failed to initialize game:", error);
    });

    return () => {
      isCancelled = true;
      game?.destroy(true);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="mx-auto aspect-[2/1] w-full max-w-4xl overflow-hidden rounded-lg"
      aria-label="Gravity Runner game"
    />
  );
}

export default GameCanvas;
