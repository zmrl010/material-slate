import React from 'react';
import {Element as SlateElement} from 'slate';
import {RenderElementProps} from 'slate-react';

export type ElementNodeType =
  | 'block-quote'
  | 'heading-one'
  | 'heading-two'
  | 'list-item'
  | 'numbered-list'
  | 'bulleted-list'
  | 'paragraph';

export interface ElementNode extends SlateElement {
  type: ElementNodeType;
}

export interface LinkElementNode extends SlateElement {
  type: 'link';
  url: string;
}

export interface ElementProps extends RenderElementProps {
  element: ElementNode | LinkElementNode;
}

export function Element({
  attributes,
  children,
  element,
}: ElementProps): JSX.Element {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'heading-one':
      return <span {...attributes}>{children}</span>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    case 'link':
      return (
        <a {...attributes} href={element.url}>
          {children}
        </a>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
}

export default Element;
