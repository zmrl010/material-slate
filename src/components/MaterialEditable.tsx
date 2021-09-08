import { useCallback, KeyboardEvent, forwardRef, ForwardedRef } from "react";
import { Editable, useSlate } from "slate-react";
import Leaf from "./Leaf";
import Element from "./Element";
import { isReactHotkey } from "../util/hotkey";
import { fillSpaces } from "../util/text";
import { createStyles, makeStyles } from "@material-ui/core";
import { useEditorRef, TextFormat } from "../lib/slate";
import clsx from "clsx";
import { theme } from "../theme";

import type { EditableProps } from "slate-react/dist/components/editable";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
  "mod+f": "fill",
};

const TAB_SPACES = 4;

const useStyles = makeStyles(
  () =>
    createStyles({
      editable: {
        height: "100%",
        width: "100%",
        cursor: "text",
      },
    }),
  { name: "MaterialEditable", defaultTheme: theme }
);

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
        editor.insertText(fillSpaces(TAB_SPACES));
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
  const { className, ...editableProps } = props;

  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  const onKeyDown = useEditableBindings();

  const classes = useStyles();

  useEditorRef(ref);

  return (
    <Editable
      renderElement={renderElement}
      renderLeaf={renderLeaf}
      placeholder={"Start typing..."}
      spellCheck
      className={clsx(classes.editable, className)}
      onKeyDown={onKeyDown}
      {...editableProps}
    />
  );
});

export default MaterialEditable;
