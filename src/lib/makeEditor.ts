import { createEditor } from "slate";
import { withHistory } from "slate-history";
import { withReact } from "slate-react";
import { withBlocks, withMarks, withLinks, withImages } from "../plugins";
import { MaterialEditor } from "./types";

/**
 * Creates a rich text editor for Material UI with plugins:
 *  - withHistory
 *  - withReact
 *  - withBlocks
 *  - withMarks
 *  - withImages
 *  - withLinks
 */
export function makeEditor(): MaterialEditor {
  return withImages(
    withLinks(withBlocks(withMarks(withHistory(withReact(createEditor())))))
  );
}

export default makeEditor;
