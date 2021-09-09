/**
 * @see https://github.com/ianstormtaylor/slate/blob/master/site/examples/images.tsx
 **/

import { Editor, Transforms, Element as SlateElement } from "slate";
import { isUrl } from "../../util/url";
import type { ImageElement } from "./types";

const isString = (val: unknown): val is string => typeof val === "string";

export const IMAGE_EDITOR_KEY = Symbol("IMAGE_EDITOR_KEY");

export interface ImageEditor {
  isVoid: (element: SlateElement) => boolean;
  insertData: (data: DataTransfer) => void;
}

export function withImages<E extends Editor>(editor: E): E & ImageEditor {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element: SlateElement & { type?: string }) => {
    return element.type === "image" ? true : isVoid(element);
  };

  editor.insertData = (data) => {
    const text = data.getData("text/plain");
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split("/");
        if (mime === "image") {
          reader.addEventListener("load", () => {
            const url = reader.result;
            if (isString(url)) {
              insertImage(editor, url);
            }
          });

          reader.readAsDataURL(file);
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
}

export function insertImage(editor: Editor, url: string): void {
  const image: ImageElement = {
    type: "image",
    url,
    children: [{ text: "" }],
  };

  Transforms.insertNodes(editor, image);
}

function isImageUrl(url: string) {
  if (!url || !isUrl(url)) {
    return false;
  }
  const ext = new URL(url).pathname.split(".").pop();
  return !!ext && isImageExtension(ext);
}

function isImageExtension(ext: string) {
  return ext.match(/.(jpg|jpeg|png|gif)$/i);
}

export default withImages;
