/**
 * @fileoverview
 * Textual utility functions
 */

/**
 * create a string with **count** number of spaces
 * @param count
 * @returns
 */
export function spaces(count: number): string {
  return "".padStart(count, " ");
  // return Array.from({ length: numSpaces }).fill(' ').join('');
}
