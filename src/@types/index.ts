import { CustomEditor, CustomText, CustomElement } from "../lib/types";

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Text: CustomText;
    Element: CustomElement;
  }
}
