import { Editor } from "slate";
import { TextFormat } from "../../slate/custom-types";

export interface MarkEditor {
  isMarkActive: (format: TextFormat) => boolean;
  toggleMark: (format: TextFormat) => void;
}

export function isMarkActive(editor: Editor, format: TextFormat): boolean {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
}

export function withMarks<E extends Editor>(editor: E): E & MarkEditor {
  const markEditor: MarkEditor = {
    isMarkActive: (format) => isMarkActive(markEditor, format),
    toggleMark: (format) => {
      if (isMarkActive(markEditor, format)) {
        editor.removeMark(format);
      } else {
        editor.addMark(format, true);
      }
    },
  };

  return { ...editor, ...markEditor };
}

export default withMarks;
