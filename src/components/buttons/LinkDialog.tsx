import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  defaultValue?: string;
  onSubmit: (link: string) => void;
}

export function LinkDialog(props: Props): JSX.Element {
  const { open, onClose, onSubmit, defaultValue = "" } = props;
  const [link, setLink] = useState(defaultValue);

  // const protocol = "https://";
  // const linkWithProtocol = protocol + link;

  useEffect(() => {
    if (open) {
      setLink(defaultValue);
    }
  }, [open, defaultValue]);

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(link);
          onClose();
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
          <Button onClick={onClose} color="primary">
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

export default LinkDialog;
