import { Editor } from 'slate'

export interface Mark {
  type: string
  text?: string
}

export interface MarkMethod<R> {
  (mark: Mark): R
}

export interface MarkEditor extends Editor {
  isMarkActive: MarkMethod<boolean>
  toggleMark: MarkMethod<void>
}


export default function withMarks<E extends Editor>(editor: E): E & MarkEditor {
  const markEditor = editor as E & MarkEditor

  markEditor.isMarkActive = (mark: Mark) => {
    const marks = Editor.marks(markEditor)
    return marks ? marks[mark.type] === true : false
  }

  markEditor.toggleMark = (mark: Mark) => {
    if (markEditor.isMarkActive(mark)) {
      markEditor.removeMark(mark.type);
    } else {
      markEditor.addMark(mark.type, true);
    }
  }

  return markEditor
}
