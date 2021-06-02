import { BaseEditor, Descendant } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";
import type {
  BlockEditor,
  MarkEditor,
  // LinkEditor,
  ImageEditor,
  LinkElement,
  ImageElement,
  CheckListItemElement,
} from "../plugins";

export type MaterialEditor = BaseEditor &
  ReactEditor &
  HistoryEditor &
  MarkEditor &
  BlockEditor &
  // LinkEditor &
  ImageEditor;

export type ElementType =
  | "block-quote"
  | "bulleted-list"
  | "check-list-item"
  | "heading-one"
  | "heading-two"
  | "list-item"
  | "numbered-list"
  | "paragraph";

export type BlockQuoteElement = { type: "block-quote"; children: Descendant[] };

export type BulletedListElement = {
  type: "bulleted-list";
  children: Descendant[];
};

export type HeadingOneElement = {
  type: "heading-one";
  children: Descendant[];
};

export type HeadingTwoElement = {
  type: "heading-two";
  children: Descendant[];
};

export type ListItemElement = {
  type: "list-item";
  children: Descendant[];
};

export type NumberedListElement = {
  type: "numbered-list";
  children: Descendant[];
};

export type ParagraphElement = {
  type: "paragraph";
  children: Descendant[];
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
