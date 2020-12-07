import { KeyboardEvent } from 'react'
import isHotkey from 'is-hotkey';

/**
 * React-specific wrapper for is-hotkey. 
 * Created because the typed interfaces don't work together as expected.
 */
export function isReactHotkey(hotkey: string, event: KeyboardEvent): boolean {
  return isHotkey(hotkey, (event as unknown) as globalThis.KeyboardEvent)
}