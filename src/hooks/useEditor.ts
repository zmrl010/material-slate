import useLazyRef from "./useLazyRef";
import { makeEditor, MaterialEditor } from '../slate'


export default function useEditor(): MaterialEditor {
  const editorRef = useLazyRef(makeEditor);

  return editorRef.current;
}
