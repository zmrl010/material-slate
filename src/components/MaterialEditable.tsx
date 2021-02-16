import React, { useCallback, KeyboardEvent, KeyboardEventHandler } from "react";
import { Editable } from "slate-react";
import { useEditor } from "../hooks";
import Leaf from "./Leaf";
import Element from "./Element";
import { isReactHotkey } from "../util/hotkey";
import { fillSpaces } from "../util/text";
import { createStyles, makeStyles } from "@material-ui/core";

import type { EditableProps } from "slate-react/dist/components/editable";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const TAB_SPACES = 4;

const useStyles = makeStyles(() =>
  createStyles({
    editable: {
      minHeight: 100,
      height: "100%",
      width: "100%",
      cursor: "text",
    },
  })
);

type BindingMap = { [k: string]: KeyboardEventHandler<HTMLDivElement> };

function useEditableBindings(bindings: BindingMap = {}) {
  const editor = useEditor();

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    for (const hotkey in HOTKEYS) {
      if (isReactHotkey(hotkey, event)) {
        event.preventDefault();
        const markType = HOTKEYS[hotkey as keyof typeof HOTKEYS];
        editor.toggleMark({ type: markType });
      }
    }
    if (event.key === "Tab") {
      event.preventDefault();
      editor.insertText(fillSpaces(TAB_SPACES));
    }
  };

  return onKeyDown;
}

export type MaterialEditableProps = EditableProps;

export function MaterialEditable(props: MaterialEditableProps): JSX.Element {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  const onKeyDown = useEditableBindings();

  const classes = useStyles();

  return (
    <Editable
      renderElement={renderElement}
      renderLeaf={renderLeaf}
      placeholder={"Start typing..."}
      spellCheck
      className={classes.editable}
      onKeyDown={onKeyDown}
      {...props}
    />
  );
}

export default MaterialEditable;
