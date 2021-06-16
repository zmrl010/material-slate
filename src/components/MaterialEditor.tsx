import React, { ReactNode, useMemo } from "react";
import { Descendant } from "slate";
import { Slate } from "slate-react";
import { makeEditor } from "../slate";
import { noopFunc } from "../util/func";

export interface MaterialEditorProps {
  onChange?: ((value: Descendant[]) => void) | undefined;
  value?: Descendant[] | undefined;
  children: ReactNode;
}

/**
 * Material UI Slate rich text editor
 * @param props
 */
export function MaterialEditor(props: MaterialEditorProps): JSX.Element {
  const { onChange = noopFunc, value = [], children } = props;
  const editor = useMemo(() => makeEditor(), []);

  return (
    <Slate editor={editor} value={value} onChange={onChange}>
      {children}
    </Slate>
  );
}

export default MaterialEditor;
