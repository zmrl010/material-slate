import { Text } from "slate";

export interface ImageElement {
  type: "image";
  url: string;
  alt?: string;
  children: Text[];
}
