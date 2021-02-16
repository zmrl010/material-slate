import { Node } from "slate";

export function getPlainNode(text = ""): Node {
  return {
    type: "paragraph",
    children: [{ text }],
  };
}

export function makeBaseState(text = ""): Node[] {
  return [getPlainNode(text)];
}
