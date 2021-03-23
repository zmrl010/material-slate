import { useState } from "react";
import useIsomorphicEffect from "./useIsomorphicEffect";

/**
 * Exports a boolean that tells you if a given key is pressed.
 * @param key
 */
export default function useIsKeyPressed(key: string): boolean {
  const [isKeyPressed, setIsKeyPressed] = useState(false);
  // const isKeyPressed = useRef(false);

  useIsomorphicEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === key) {
        setIsKeyPressed(true);
      }
    };
    const keyUpHandler = (event: KeyboardEvent) => {
      if (event.key === key) {
        setIsKeyPressed(false);
      }
    };
    globalThis.addEventListener("keydown", keyDownHandler);
    globalThis.addEventListener("keyup", keyUpHandler);
    return () => {
      globalThis.removeEventListener("keydown", keyDownHandler);
      globalThis.removeEventListener("keyup", keyUpHandler);
    };
  }, [key]);

  return isKeyPressed;
}
