import React from "react";
import { ButtonProps } from "@material-ui/core";
import { useMaterialSlate } from "../../hooks";
import { ToggleButton } from "./ToggleButton";
import { TextFormat } from "../../slate/custom-types";

interface Props extends ButtonProps {
  format: TextFormat;
}

export default function MarkButton({
  children,
  format,
  ...props
}: Props): JSX.Element {
  const editor = useMaterialSlate();

  return (
    <ToggleButton
      value={format}
      selected={editor.isMarkActive(format)}
      onMouseDown={(e) => {
        e.preventDefault();
        editor.toggleMark(format);
      }}
      {...props}
    >
      {children}
    </ToggleButton>
  );
}
