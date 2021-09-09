import type { Text } from "slate";

export interface LinkElement {
  type: "link";
  url: string;
  children: Text[];
}
