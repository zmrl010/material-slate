import { createEditor, Editor } from "slate";
import { withHistory, HistoryEditor } from 'slate-history';
import { withReact, ReactEditor } from "slate-react";
import { withBlocks, withMarks, withLinks, BlockEditor, MarkEditor, LinkEditor } from '../plugins';
// import {  } from "slate";
// import {  } from 'slate-history';
// import {  } from "slate-react";
// import {  } from '../plugins';


export type MaterialEditor = Editor & ReactEditor & HistoryEditor & MarkEditor & BlockEditor & LinkEditor;

/**
 * Creates a rich text editor for Material UI with plugins:
 *  - withHistory
 *  - withReact
 *  - withBlocks
 *  - withMarks
 * 
 */
export function makeEditor(): MaterialEditor {
  return withLinks(withBlocks(withMarks(withHistory(withReact(createEditor())))))
}

export default makeEditor
