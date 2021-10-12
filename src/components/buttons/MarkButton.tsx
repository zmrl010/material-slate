import { ToggleButton, ToggleButtonProps } from "@mui/material";
import { useSlate } from "slate-react";
import type { TextFormat } from "../../types";

interface Props extends ToggleButtonProps {
  value: TextFormat;
}

export function MarkButton(props: Props): JSX.Element {
  const { children, value, ...buttonProps } = props;
  const editor = useSlate();

  return (
    <ToggleButton
      value={value}
      selected={editor.isMarkActive(value)}
      onMouseDown={(e) => {
        e.preventDefault();
        editor.toggleMark(value);
      }}
      aria-label={value}
      {...buttonProps}
    >
      {children}
    </ToggleButton>
  );
}

export default MarkButton;
