import ToggleButton from "@material-ui/lab/ToggleButton";
import { useSlate } from "slate-react";
import { ButtonProps } from "@material-ui/core";
import { ElementType } from "../../lib/custom-types";

interface Props extends ButtonProps {
  format: ElementType;
}

export function BlockButton(props: Props): JSX.Element {
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
