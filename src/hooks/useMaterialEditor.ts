import useLazyRef from "./useLazyRef";
import { makeEditor, MaterialEditor } from "../slate";

export function useMaterialEditor(): MaterialEditor {
  const editorRef = useLazyRef(makeEditor);

  return editorRef.current;
}

export default useMaterialEditor;
