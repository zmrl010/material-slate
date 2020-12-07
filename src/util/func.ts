
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
 * Assigns a function expecting an object as its first parameter to an object
 * of that type and returns the object with that method to be called
 * without the object parameter
 */
// export function assign<
//   O extends Record<string, unknown>,
//   R,
//   F extends (obj: O, ...args: unknown[]) => R>(obj: O, func: F): O & {[func]: (...args: Parameters<F>) => R} {
//     obj[func.name] = ()
// }