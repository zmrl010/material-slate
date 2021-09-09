import ToggleButton from "@material-ui/lab/ToggleButton";
import { useSlate } from "slate-react";
import { ElementType } from "../../lib";

import type { ButtonProps } from "@material-ui/core";

export interface BlockButtonProps extends ButtonProps {
  format: ElementType;
}

export function BlockButton(props: BlockButtonProps): JSX.Element {
  const { children, format, ...buttonProps } = props;
  const editor = useSlate();

  return (
    <ToggleButton
      value={format}
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
