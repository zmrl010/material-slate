

/**
 * Checks whether a given string is a valid url or not
 * @param text 
 */
export function isUrl(text: string): boolean {
  try {
    new URL(text)
  } catch (_) {
    return false
  }

  return true
}