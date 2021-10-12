import { ToggleButton, ToggleButtonProps } from "@mui/material";
import { useSlate } from "slate-react";
import type { TextFormat } from "../../lib";

interface Props extends ToggleButtonProps {
  format: TextFormat;
}

export function MarkButton(props: Props): JSX.Element {
  const { children, format, value, ...buttonProps } = props;
  const editor = useSlate();

  return (
    <ToggleButton
      value={value || format}
      selected={editor.isMarkActive(format)}
      onMouseDown={(e) => {
        e.preventDefault();
        editor.toggleMark(format);
      }}
      {...buttonProps}
    >
      {children}
    </ToggleButton>
  );
}

export default MarkButton;
