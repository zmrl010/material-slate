import type { MaterialEditor } from '../slate'
import { useSlate } from 'slate-react'

/**
 * This assumes the provided plugins were applied to the editor
 */
export default function useMaterialSlate(): MaterialEditor {
  const materialEditor = useSlate()
  return materialEditor as MaterialEditor
}