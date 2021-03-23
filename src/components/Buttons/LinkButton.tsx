import { ToggleButton } from "./ToggleButton";
import React, { useState } from "react";
import { useMaterialSlate } from "../../hooks";
import { ButtonProps } from "@material-ui/core";
import LinkDialog from "./LinkDialog";
import { insertLink } from "../../plugins/withLinks";

interface Props extends ButtonProps {
  n?: null;
}

export default function LinkButton({ children, ...props }: Props): JSX.Element {
  const [dialogOpen, setDialogOpen] = useState(false);
  const editor = useMaterialSlate();

  return (
    <>
      {/* <LinkDialog
        open={dialogOpen}
        handleClose={() => {
          setDialogOpen(false);
        }}
        onSubmit={(url) => {
          if (url) {
            insertLink(editor, url);
          }
        }}
      /> */}
      <ToggleButton
        value={"link"}
        selected={editor.isLinkActive()}
        onMouseDown={(e) => {
          e.preventDefault();
          // FIXME use dialog instead
          // needed to use prompt so that the selected text would stay the same
          const url = window.prompt("Enter the URL for the link:", "http://");
          if (url) {
            insertLink(editor, url);
          }
          // setDialogOpen(true);
        }}
        {...props}
      >
        {children}
      </ToggleButton>
    </>
  );
}
