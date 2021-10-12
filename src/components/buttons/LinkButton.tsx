import { useSlate } from "slate-react";
import { ToggleButton, ToggleButtonProps } from "@mui/material";
import { insertLink, isLinkActive } from "../../plugins";

export type LinkButtonProps = Omit<ToggleButtonProps, "value">;

export function LinkButton(props: LinkButtonProps): JSX.Element {
  const { children, ...buttonProps } = props;
  const editor = useSlate();

  return (
    <ToggleButton
      value="link"
      aria-label="link"
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
