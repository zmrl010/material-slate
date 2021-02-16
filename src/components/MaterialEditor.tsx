import React, { ReactNode } from "react";
import { Node } from "slate";
import { Slate } from "slate-react";
import useEditor from "../hooks/useEditor";
import { makeEditor } from "../slate";
import { noopFunc } from "../util/func";

export interface MaterialEditorProps {
  onChange?: (value: Node[]) => void;
  value?: Node[];
  children: ReactNode;
}

/**
 * Material UI Slate rich text editor
 * @param props
 */
export function MaterialEditor(props: MaterialEditorProps): JSX.Element {
  const { onChange = noopFunc, value = [], children } = props;
  const editor = useEditor();

  return (
    <Slate editor={editor} value={value} onChange={onChange}>
      {children}
    </Slate>
  );
}

export default MaterialEditor;
