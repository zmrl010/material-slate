export function fillSpaces(numSpaces: number): string {
  return Array.from({ length: numSpaces }).fill(' ').join('');
}