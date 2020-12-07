import React, {useState} from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  TextField,
} from '@material-ui/core';

interface Props {
  open: boolean;
  handleClose: () => void;
  defaultValue?: string;
  submitLink: (link: string) => void;
}

export default function LinkDialog(props: Props): JSX.Element {
  const {open, handleClose, submitLink, defaultValue = ''} = props;
  const [link, setLink] = useState(defaultValue);

  const protocol = 'https://';
  const linkWithProtocol = protocol + link;

  const handleCloseAndClear = () => {
    handleClose();
    setLink('');
  };

  const handleCancel = () => {
    handleCloseAndClear();
  };
  const handleSubmit = () => {
    submitLink(linkWithProtocol);
    handleCloseAndClear();
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseAndClear}
      onKeyDown={(event) => {
        // TODO useKeyEvents hook to simplify
        if (event.key === 'Enter') {
          handleSubmit();
        }
      }}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Hyperlink</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter a URL for the link</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="url"
          label="Hyperlink URL"
          fullWidth
          value={link}
          onChange={(e) => setLink(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">{protocol}</InputAdornment>
            ),
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
