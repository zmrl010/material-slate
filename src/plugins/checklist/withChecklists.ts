import { Editor, Element, Point, Range, Transforms } from "slate";

export interface ChecklistEditor {
  deleteBackward: (unit: "character" | "word" | "line" | "block") => void;
}

export function withChecklists<E extends Editor>(
  editor: E
): E & ChecklistEditor {
  const { deleteBackward } = editor;

  editor.deleteBackward = (unit) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const [match] = Editor.nodes(editor, {
        match: (node) =>
          !Editor.isEditor(node) &&
          Element.isElement(node) &&
          node.type === "check-list-item",
      });

      if (match) {
        const [, path] = match;
        const start = Editor.start(editor, path);

        if (Point.equals(selection.anchor, start)) {
          const newProps: Partial<Element> = { type: "paragraph" };

          Transforms.setNodes(editor, newProps, {
            match: (node) =>
              !Editor.isEditor(node) &&
              Element.isElement(node) &&
              node.type === "check-list-item",
          });
          return;
        }
      }
    }
    deleteBackward(unit);
  };

  return editor;
}

export default withChecklists;
