import { createEditor, Editor } from "slate";
import { withHistory } from "slate-history";
import { withReact } from "slate-react";
import { withBlocks, withMarks, withLinks, withImages } from "../plugins";

export type MaterialEditor = Editor;

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
