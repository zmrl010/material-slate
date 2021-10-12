import { ToggleButton, ToggleButtonProps } from "@mui/material";
import { useSlate } from "slate-react";
import { ElementType } from "../../types";

export interface BlockButtonProps extends ToggleButtonProps {
  value: ElementType;
}

export function BlockButton(props: BlockButtonProps): JSX.Element {
  const { children, value, ...buttonProps } = props;
  const editor = useSlate();

  return (
    <ToggleButton
      value={value}
      aria-label={value}
      selected={editor.isBlockActive({ type: value })}
      onClick={(e) => {
        e.preventDefault();
        editor.toggleBlock({ type: value });
      }}
      {...buttonProps}
    >
      {children}
    </ToggleButton>
  );
}

export default BlockButton;
