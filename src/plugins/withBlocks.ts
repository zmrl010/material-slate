import { Transforms, Editor, Element as SlateElement } from "slate";

const LIST_TYPES = new Set(["numbered-list", "bulleted-list"]);

export interface Block {
  type: string;
  // alignment: Alignment
}
export interface BlockMethod<R> {
  (block: Block): R;
}

export interface BlockEditor extends Editor {
  isBlockActive: BlockMethod<boolean>;
  toggleBlock: BlockMethod<void>;
}

export function withBlocks<E extends Editor>(editor: E): E & BlockEditor {
  const newEditor = editor as E & BlockEditor;

  newEditor.isBlockActive = (block: Block) => {
    const [match] = Editor.nodes(newEditor, {
      match: (node) => node.type === block.type,
    });
    return !!match;
  };

  newEditor.toggleBlock = (block: Block) => {
    const isActive = newEditor.isBlockActive(block);
    const isList = LIST_TYPES.has(block.type);

    Transforms.unwrapNodes(newEditor, {
      match: (node) =>
        !Editor.isEditor(node) &&
        SlateElement.isElement(node) &&
        LIST_TYPES.has(node.type as string),
      split: true,
    });

    Transforms.setNodes(newEditor, {
      type: isActive ? "paragraph" : isList ? "list-item" : block.type,
    });

    if (!isActive && isList) {
      const selected = { type: block.type, children: [] };
      Transforms.wrapNodes(newEditor, selected);
    }
  };

  return newEditor;
}

export default withBlocks;
