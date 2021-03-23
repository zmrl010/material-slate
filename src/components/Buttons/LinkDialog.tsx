import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@material-ui/core";

interface Props {
  open: boolean;
  handleClose: () => void;
  defaultValue?: string;
  onSubmit: (link: string) => void;
}

export default function LinkDialog(props: Props): JSX.Element {
  const { open, handleClose, onSubmit, defaultValue = "" } = props;
  const [link, setLink] = useState(defaultValue);

  // const protocol = "https://";
  // const linkWithProtocol = protocol + link;

  useEffect(() => {
    if (open) {
      setLink(defaultValue);
    }
  }, [open, defaultValue]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(link);
          handleClose();
        }}
      >
        {/* <DialogTitle id="form-dialog-title">Hyperlink</DialogTitle> */}
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="url"
            label="Hyperlink URL"
            fullWidth
            value={link}
            onChange={(e) => setLink(e.target.value)}
            // InputProps={{
            //   startAdornment: (
            //     <InputAdornment position="start">{protocol}</InputAdornment>
            //   ),
            // }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" type="submit">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
