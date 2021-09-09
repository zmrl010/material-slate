import { AddPhotoAlternate as AddPhotoAlternateIcon } from "@material-ui/icons";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { useSlate } from "slate-react";
import { insertImage } from "../../plugins";

import type { ButtonProps } from "@material-ui/core";

export interface UploadImage {
  (file: File): Promise<string>;
}

export interface ImageButtonProps extends ButtonProps {
  uploadImage?: UploadImage;
}

export function ImageButton(props: ImageButtonProps): JSX.Element {
  const { uploadImage, ...buttonProps } = props;
  const editor = useSlate();

  return (
    <div>
      <input
        accept="image/*"
        style={{ display: "none" }}
        id={"icon-button-file"}
        type="file"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (file && uploadImage) {
            const url = await uploadImage(file);

            if (!url) {
              throw new Error("Problem uploading image");
            }

            insertImage(editor, url);
          }
        }}
      />
      <label htmlFor={"icon-button-file"}>
        <ToggleButton
          aria-label="upload picture"
          component="span"
          {...buttonProps}
        >
          <AddPhotoAlternateIcon />
        </ToggleButton>
      </label>
    </div>
  );
}

export default ImageButton;
