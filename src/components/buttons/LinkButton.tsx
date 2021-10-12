import { useSlate } from "slate-react";
import { ToggleButton, ToggleButtonProps } from "@mui/material";
import { insertLink, isLinkActive } from "../../plugins";

export function LinkButton(props: ToggleButtonProps): JSX.Element {
  const { children, value, ...buttonProps } = props;
  const editor = useSlate();

  return (
    <ToggleButton
      value={value || "link"}
      selected={isLinkActive(editor)}
      onMouseDown={(e) => {
        e.preventDefault();
        // FIXME use dialog instead
        // needed to use prompt so that the selected text would stay the same
        const url = window.prompt("Enter the URL for the link:", "http://");
        if (url) {
          insertLink(editor, url);
        }
      }}
      {...buttonProps}
    >
      {children}
    </ToggleButton>
  );
}

export default LinkButton;
