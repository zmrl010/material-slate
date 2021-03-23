/**
 * @see https://github.com/ianstormtaylor/slate/blob/master/site/examples/images.tsx
 **/

import { Editor, Transforms, Element as SlateElement } from "slate";
import { ReactEditor } from "slate-react";
import { isUrl } from "../util/url";

const isString = (val: unknown): val is string => typeof val === "string";

export const IMAGE_EDITOR_KEY = Symbol("IMAGE_EDITOR_KEY");

export interface ImageElementNode extends SlateElement {
  type: "image";
  url: string;
  alt?: string;
}

export interface ImageEditor extends ReactEditor {
  _key: typeof IMAGE_EDITOR_KEY;
}

export function withImages<E extends ReactEditor>(editor: E): E & ImageEditor {
  const { insertData, isVoid } = editor;

  const imageEditor = editor as E & ImageEditor;

  imageEditor._key = IMAGE_EDITOR_KEY;

  imageEditor.isVoid = (element) => {
    return element.type === "image" ? true : isVoid(element);
  };

  imageEditor.insertData = (data) => {
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
              insertImage(imageEditor, url);
            }
          });

          reader.readAsDataURL(file);
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(imageEditor, text);
    } else {
      insertData(data);
    }
  };

  return imageEditor;
}

export function insertImage(editor: Editor, url: string): void {
  const image = {
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
