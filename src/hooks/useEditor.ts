import useLazyRef from "./useLazyRef";
import { makeEditor, MaterialEditor } from '../slate'


export function useEditor(): MaterialEditor {
  const editorRef = useLazyRef(makeEditor);

  return editorRef.current;
}

export default useEditor
