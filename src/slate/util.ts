import { Node } from "slate";

export function makePlainNode(text = ""): Node {
  return {
    type: "paragraph",
    children: [{ text }],
  };
}

export function makeBaseState(text = ""): Node[] {
  return [makePlainNode(text)];
}
