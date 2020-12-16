import { Transforms, Node, Range, Editor } from 'slate'
import { ReactEditor } from 'slate-react'
import { isUrl } from '../util/url'

export type Link = Node & { url: string }

export function matchLink(node: Node): boolean {
  return node.type === 'link'
}

export function insertLink(editor: Editor, url: string): void {
  if (editor.selection) {
    wrapLink(editor, url)
  }
}

export function isLinkActive(editor: Editor): boolean {
  const [link] = Editor.nodes(editor, { match: matchLink })
  return !!link
}

export function unwrapLink(editor: Editor): void {
  Transforms.unwrapNodes(editor, { match: matchLink })
}

export function wrapLink(editor: Editor, url: string): void {
  if (isLinkActive(editor)) {
    unwrapLink(editor)
  }

  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)
  const link = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : []
  }

  if (isCollapsed) {
    Transforms.insertNodes(editor, link)
  } else {
    Transforms.wrapNodes(editor, link, { split: true })
    Transforms.collapse(editor, { edge: 'end' })
  }
}

export interface LinkEditor extends ReactEditor {
  insertLink: (url: string) => void
  isLinkActive: () => boolean
  unwrapLink: (url: string) => void
  wrapLink: (url: string) => void
}

/**
 * Slate plugin to support hyperlinks.
 * @param editor 
 * 
 * @requires slate-react 
 */
export function withLinks<E extends ReactEditor>(editor: E): E & LinkEditor {
  const { insertData, insertText, isInline } = editor
  const linkEditor = editor as E & LinkEditor

  linkEditor.isInline = (element) => {
    return element.type === 'link' ? true : isInline(element)
  }

  linkEditor.insertText = (text) => {
    if (text && isUrl(text)) {
      wrapLink(linkEditor, text)
    } else {
      insertText(text)
    }
  }

  linkEditor.insertData = (data) => {
    const text = data.getData('text/plain')

    if (text && isUrl(text)) {
      wrapLink(linkEditor, text)
    } else {
      insertData(data)
    }
  }

  linkEditor.insertLink = (url: string) => insertLink(linkEditor, url)
  linkEditor.isLinkActive = () => isLinkActive(linkEditor)
  linkEditor.unwrapLink = () => unwrapLink(linkEditor)
  linkEditor.wrapLink = (url: string) => wrapLink(linkEditor, url)

  return linkEditor
}

export default withLinks