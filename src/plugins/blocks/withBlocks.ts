import { Transforms, Editor, Element, Node } from "slate";

const LIST_TYPES = new Set(["numbered-list", "bulleted-list"]);

export interface BlockEditor {
  isBlockActive: (element: Pick<Element, "type">) => boolean;
  toggleBlock: (element: Omit<Element, "children">) => void;
}

export function isBlockActive(
  editor: Editor,
  element: Pick<Element, "type">
): boolean {
  const [match] = Editor.nodes(editor, {
    match: (node: Node) =>
      Element.isElement(node) && node.type === element.type,
  });

  return !!match;
}

export function withBlocks<E extends Editor>(editor: E): E & BlockEditor {
  editor.isBlockActive = (element) => isBlockActive(editor, element);

  editor.toggleBlock = (element) => {
    const isActive = isBlockActive(editor, element);
    const isList = LIST_TYPES.has(element.type);

    Transforms.unwrapNodes(editor, {
      match: (node) =>
        !Editor.isEditor(node) &&
        Element.isElement(node) &&
        LIST_TYPES.has(node.type as string),
      split: true,
    });

    const newProperties: Partial<Element> = {
      type: isActive ? "paragraph" : isList ? "list-item" : element.type,
    };

    Transforms.setNodes(editor, newProperties);

    if (!isActive && isList) {
      const selected = { type: element.type, children: [] };
      // FIXME type assertion
      Transforms.wrapNodes(editor, selected as Element);
    }
  };

  return editor;
}

export default withBlocks;
