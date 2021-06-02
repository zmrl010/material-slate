import { Transforms, Range, Editor, Element } from "slate";
import { isUrl } from "../../util/url";
import { LinkElement } from "./types";

// export interface LinkEditor {
//   insertLink: (url: string) => void;
//   isLinkActive: () => boolean;
//   unwrapLink: (url: string) => void;
//   wrapLink: (url: string) => void;
// }

/**
 * Slate plugin to support hyperlinks.
 * @param editor
 *
 * @requires slate-react
 */
export function withLinks<E extends Editor>(editor: E): E {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = (element: Element) => {
    return element.type === "link" ? true : isInline(element);
  };

  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data) => {
    const text = data.getData("text/plain");

    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
}

export function insertLink(editor: Editor, url: string): void {
  if (editor.selection) {
    wrapLink(editor, url);
  }
}

export function isLinkActive(editor: Editor): boolean {
  const [link] = Editor.nodes(editor, {
    match: (node) =>
      !Editor.isEditor(node) && Element.isElement(node) && node.type === "link",
  });
  return !!link;
}

export function unwrapLink(editor: Editor): void {
  Transforms.unwrapNodes(editor, {
    match: (node) =>
      !Editor.isEditor(node) && Element.isElement(node) && node.type === "link",
  });
}

export function wrapLink(editor: Editor, url: string): void {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link: LinkElement = {
    type: "link",
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
}

export default withLinks;
