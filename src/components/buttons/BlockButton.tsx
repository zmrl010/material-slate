import { ToggleButton, ToggleButtonProps } from "@mui/material";
import { useSlate } from "slate-react";
import { ElementType } from "../../lib";

export interface BlockButtonProps extends ToggleButtonProps {
  format: ElementType;
}

export function BlockButton(props: BlockButtonProps): JSX.Element {
  const { children, format, value, ...buttonProps } = props;
  const editor = useSlate();

  return (
    <ToggleButton
      value={value || format}
      selected={editor.isBlockActive({ type: format })}
      onClick={(e) => {
        e.preventDefault();
        editor.toggleBlock({ type: format });
      }}
      {...buttonProps}
    >
      {children}
    </ToggleButton>
  );
}

export default BlockButton;
