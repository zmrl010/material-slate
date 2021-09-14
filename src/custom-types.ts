import type { CustomEditor, CustomText, CustomElement } from "./types";

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Text: CustomText;
    Element: CustomElement;
  }
}
