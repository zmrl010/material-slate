import { BaseEditor } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";
import type {
  BlockEditor,
  MarkEditor,
  ImageEditor,
  LinkElement,
  ImageElement,
  CheckListItemElement,
} from "../../plugins";

export type MaterialEditor = BaseEditor &
  ReactEditor &
  HistoryEditor &
  MarkEditor &
  BlockEditor &
  ImageEditor;

export type BlockQuoteElement = { type: "block-quote"; children: CustomText[] };

export type BulletedListElement = {
  type: "bulleted-list";
  children: CustomText[];
};

export type HeadingElement = {
  type: "heading";
  level?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  children: CustomText[];
};

export type HeadingOneElement = {
  type: "heading-one";
  children: CustomText[];
};

export type HeadingTwoElement = {
  type: "heading-two";
  children: CustomText[];
};

export type ListItemElement = {
  type: "list-item";
  children: CustomText[];
};

export type NumberedListElement = {
  type: "numbered-list";
  children: CustomText[];
};

export type ParagraphElement = {
  type: "paragraph";
  children: CustomText[];
};

export type BlockElement =
  | BlockQuoteElement
  | BulletedListElement
  | CheckListItemElement
  | HeadingOneElement
  | HeadingTwoElement
  | ListItemElement
  | NumberedListElement
  | ParagraphElement;

export type CustomElement = LinkElement | ImageElement | BlockElement;

export type ElementType = CustomElement["type"];

export type FormattedText = {
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  underline?: boolean;
  fill?: string;
  text: string;
};

export type TextFormat = Exclude<keyof FormattedText, "text">;

export type CustomText = FormattedText;

declare module "slate" {
  interface CustomTypes {
    Editor: MaterialEditor;
    Text: CustomText;
    Element: CustomElement;
  }
}
