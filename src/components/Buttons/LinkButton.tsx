import {ToggleButton} from './ToggleButton';
import React, {useState} from 'react';
import {useMaterialSlate} from '../../hooks';
import {ButtonProps} from '@material-ui/core';
import LinkDialog from './LinkDialog';

interface Props extends ButtonProps {
  n?: null;
}

export default function LinkButton({children, ...props}: Props): JSX.Element {
  const [dialogOpen, setDialogOpen] = useState(false);
  const editor = useMaterialSlate();

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  return (
    <>
      <LinkDialog
        open={dialogOpen}
        handleClose={handleDialogClose}
        submitLink={(url) => {
          if (url) {
            editor.insertLink(url);
          }
        }}
      />
      <ToggleButton
        value={'link'}
        selected={editor.isLinkActive()}
        onMouseDown={(e) => {
          e.preventDefault();
          handleDialogOpen();
        }}
        {...props}
      >
        {children}
      </ToggleButton>
    </>
  );
}
