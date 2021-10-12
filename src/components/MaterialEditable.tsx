import { useCallback, KeyboardEvent, forwardRef, ForwardedRef } from "react";
import { Editable, useSlate } from "slate-react";
import Leaf from "./Leaf";
import Element from "./Element";
import { isReactHotkey } from "../util/hotkey";
import { spaces } from "../util/text";
import { useEditorRef } from "../lib";

import type { EditableProps } from "slate-react/dist/components/editable";
import type { TextFormat } from "../types";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
  "mod+f": "fill",
};

const TAB_SPACES = 4;

function useEditableBindings() {
  const editor = useSlate();

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      Object.entries(HOTKEYS).forEach(([hotkey, mark]) => {
        if (isReactHotkey(hotkey, event)) {
          event.preventDefault();
          editor.toggleMark(mark as TextFormat);
        }
      });
      if (event.key === "Tab") {
        event.preventDefault();
        editor.insertText(spaces(TAB_SPACES));
      }
    },
    [editor]
  );

  return onKeyDown;
}

export type MaterialEditableProps = EditableProps;

export const MaterialEditable = forwardRef(function MaterialEditable(
  props: MaterialEditableProps,
  ref: ForwardedRef<HTMLDivElement>
): JSX.Element {
  const { style, ...editableProps } = props;

  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  const onKeyDown = useEditableBindings();

  useEditorRef(ref);

  return (
    <Editable
      renderElement={renderElement}
      renderLeaf={renderLeaf}
      placeholder={"Start typing..."}
      spellCheck
      style={{ height: "100%", width: "100%", cursor: "text", ...style }}
      onKeyDown={onKeyDown}
      {...editableProps}
    />
  );
});

export default MaterialEditable;
