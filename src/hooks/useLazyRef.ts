import { MutableRefObject, useRef } from "react";

/**
 * Empty object to compare if the ref has been set or not
 */
const BASE = {};

/**
 * Lazily creates a ref. Used for something that only
 * needs to be created once or very rarely
 * @param init initializer function to be called once
 */
export function useLazyRef<T>(init: () => T): MutableRefObject<T> {
  const valueRef = useRef<T>(BASE as T);
  if (valueRef.current === BASE) {
    valueRef.current = init();
  }
  return valueRef;
}

export default useLazyRef;
