import React, { useCallback, KeyboardEvent, KeyboardEventHandler } from "react";
import { Editable, useSlate } from "slate-react";
import Leaf from "./Leaf";
import Element from "./Element";
import { isReactHotkey } from "../util/hotkey";
import { fillSpaces } from "../util/text";
import { createStyles, makeStyles } from "@material-ui/core";

import type { EditableProps } from "slate-react/dist/components/editable";
import { TextFormat } from "../slate/custom-types";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
  "mod+f": "fill",
};

const TAB_SPACES = 4;

const useStyles = makeStyles(() =>
  createStyles({
    editable: {
      minHeight: "100px",
      height: "100%",
      width: "100%",
      cursor: "text",
    },
  })
);

type BindingMap = { [k: string]: KeyboardEventHandler<HTMLDivElement> };

function useEditableBindings(bindings: BindingMap = {}) {
  const editor = useSlate();

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
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
