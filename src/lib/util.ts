import { Descendant } from "slate";

export function makePlainNode(text = ""): Descendant {
  return {
    type: "paragraph",
    children: [{ text }],
  };
}

export function makeBaseState(text = ""): Descendant[] {
  return [makePlainNode(text)];
}
