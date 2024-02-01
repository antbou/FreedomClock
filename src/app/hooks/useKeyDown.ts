import { useEffect, useCallback } from "react";

export const useKeyDown = (callback: () => void, keys: string[]) => {
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const wasAnyKeyPressed = keys.some((key: string) => event.code === key);
      if (wasAnyKeyPressed) {
        event.preventDefault();
        callback();
      }
    },
    [callback, keys]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);
};

export default useKeyDown;
