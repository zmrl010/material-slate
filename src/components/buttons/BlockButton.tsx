import { ToggleButton } from "./ToggleButton";
import React from "react";
import { useSlate } from "slate-react";
import { ButtonProps } from "@material-ui/core";
import { ElementType } from "../../slate/custom-types";

interface Props extends ButtonProps {
  format: ElementType;
}

export default function BlockButton(props: Props): JSX.Element {
  const { children, format, ...buttonProps } = props;
  const editor = useSlate();

  return (
    <ToggleButton
      value={format}
      selected={editor.isBlockActive({ type: format })}
      onMouseDown={(e) => {
        e.preventDefault();
        editor.toggleBlock({ type: format });
      }}
      {...buttonProps}
    >
      {children}
    </ToggleButton>
  );
}
