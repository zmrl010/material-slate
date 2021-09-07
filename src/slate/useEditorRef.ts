import { ForwardedRef, useEffect } from "react";
import { ReactEditor, useSlateStatic } from "slate-react";

/**
 * bind a ref to the root editor dom node
 * @param ref
 */
export function useEditorRef(ref: ForwardedRef<HTMLDivElement>): void {
  const editor = useSlateStatic();

  useEffect(() => {
    const domNode = ReactEditor.toDOMNode(editor, editor) as HTMLDivElement;
    if (typeof ref === "function") {
      ref(domNode);
    } else if (ref) {
      ref.current = domNode;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useEditorRef;
