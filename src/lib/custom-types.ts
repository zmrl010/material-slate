import { MaterialEditor, CustomText, CustomElement } from "./types";

declare module "slate" {
  interface CustomTypes {
    Editor: MaterialEditor;
    Text: CustomText;
    Element: CustomElement;
  }
}
