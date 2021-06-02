import {
  createStyles,
  ButtonProps,
  makeStyles,
  fade as alpha,
  Theme,
  Button,
} from "@material-ui/core";
import { AddPhotoAlternate as AddPhotoAlternateIcon } from "@material-ui/icons";
import { useSlate } from "slate-react";
import React from "react";
import { insertImage } from "../../plugins";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      ...theme.typography.button,
      boxSizing: "border-box",
      borderRadius: theme.shape.borderRadius,
      padding: 11,
      border: `1px solid ${alpha(theme.palette.action.active, 0.12)}`,
      color: alpha(theme.palette.action.active, 0.38),
      "&$selected": {
        color: theme.palette.action.active,
        backgroundColor: alpha(theme.palette.action.active, 0.12),
        "&:hover": {
          backgroundColor: alpha(theme.palette.action.active, 0.15),
        },
        "& + &": {
          borderLeft: 0,
          marginLeft: 0,
        },
      },
      "&$disabled": {
        color: alpha(theme.palette.action.disabled, 0.12),
      },
      "&:hover": {
        textDecoration: "none",
        // Reset on mouse devices
        backgroundColor: alpha(theme.palette.text.primary, 0.05),
        "@media (hover: none)": {
          backgroundColor: "transparent",
        },
        "&$disabled": {
          backgroundColor: "transparent",
        },
      },
    },
    selected: {},
    disabled: {},
    input: {
      display: "none",
    },
    sizeSmall: {
      padding: 7,
      fontSize: theme.typography.pxToRem(13),
    },
    /* Styles applied to the root element if `size="large"`. */
    sizeLarge: {
      padding: 15,
      fontSize: theme.typography.pxToRem(15),
    },
  })
);

export interface UploadImage {
  (file: File): Promise<string>;
}

export interface ImageButtonProps extends ButtonProps {
  uploadImage?: UploadImage;
}

export default function ImageButton(props: ImageButtonProps): JSX.Element {
  const { uploadImage, ...buttonProps } = props;
  const editor = useSlate();
  const classes = useStyles();

  return (
    <div>
      <input
        accept="image/*"
        className={classes.input}
        id={"icon-button-file"}
        type="file"
        onChange={(e) => {
          // console.log(e.target);
          const file = e.target.files?.[0];
          if (file && uploadImage) {
            uploadImage(file).then((url) => {
              insertImage(editor, url);
            });
          }
        }}
      />
      <label htmlFor={"icon-button-file"}>
        <Button
          className={classes.root}
          aria-label="upload picture"
          component="span"
          {...buttonProps}
        >
          <AddPhotoAlternateIcon />
        </Button>
      </label>
    </div>
  );
}
