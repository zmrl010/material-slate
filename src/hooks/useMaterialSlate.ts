import type { MaterialEditor } from "../slate";
import { useSlate } from "slate-react";

/**
 * This assumes the provided plugins were applied to the editor
 */
export function useMaterialSlate(): MaterialEditor {
  return useSlate();
}

export default useMaterialSlate;
