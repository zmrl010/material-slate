import { ButtonProps } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { useSlate } from "slate-react";
import { TextFormat } from "../../lib/custom-types";

interface Props extends ButtonProps {
  format: TextFormat;
}

export function MarkButton(props: Props): JSX.Element {
  const { children, format, ...buttonProps } = props;
  const editor = useSlate();

  return (
    <ToggleButton
      value={format}
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
