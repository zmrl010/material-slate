import { createEditor, Editor } from "slate";
import { withHistory, HistoryEditor } from "slate-history";
import { withReact, ReactEditor } from "slate-react";
import {
  withBlocks,
  withMarks,
  withLinks,
  withImages,
  BlockEditor,
  MarkEditor,
  LinkEditor,
  ImageEditor,
} from "../plugins";

export type MaterialEditor = Editor &
  ReactEditor &
  HistoryEditor &
  MarkEditor &
  BlockEditor &
  LinkEditor &
  ImageEditor;

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
