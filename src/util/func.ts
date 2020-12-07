
interface Composable<R> {
  (arg: R): R
}

/**
 * Compose functions together to return a single function that 
 * will return the result of each called in descending order
 * @param func first function
 * @param funcs functions to join  
 */
export function pipe<R>(func: Composable<R>, ...funcs: Composable<R>[]): Composable<R> {
  return funcs.reduce((prev, next) => value => next(prev(value)), func)
}

/**
 * Compose functions together to return a single function that 
 * will return the result of each called in ascending order
 * @param func first function
 * @param funcs functions to join  
 */
export function compose<R>(func: Composable<R>, ...funcs: Composable<R>[]): Composable<R> {
  return funcs.reduce((prev, next) => value => prev(next(value)), func)
}

/**
 * Utility function that does nothing. Useful for prop default value that will be called.
 */
export function noopFunc(): void {
  return
}