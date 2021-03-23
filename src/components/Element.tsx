import React from "react";
import { Element as SlateElement } from "slate";
import { RenderElementProps } from "slate-react";
import { LinkElementNode } from "../plugins/withLinks";
import { ImageElementNode } from "../plugins/withImages";
import { ImageElement } from "./ImageElement";
import useIsKeyPressed from "../hooks/useIsKeyPressed";
import { Link } from "@material-ui/core";

export type ElementNodeType =
  | "block-quote"
  | "heading-one"
  | "heading-two"
  | "list-item"
  | "numbered-list"
  | "bulleted-list"
  | "paragraph";

export interface ElementNode extends SlateElement {
  type: ElementNodeType;
}

export interface ElementProps extends RenderElementProps {
  element: ElementNode | LinkElementNode | ImageElementNode;
}

export function Element(props: ElementProps): JSX.Element {
  const { attributes, children, element } = props;

  const isCtrlPressed = useIsKeyPressed("Control");

  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <span {...attributes}>{children}</span>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    case "link":
      return (
        <div {...attributes} contentEditable={!isCtrlPressed}>
          <Link href={element.url} target="_blank" rel="noreferrer">
            {children}
          </Link>
        </div>
      );
    case "image":
      return (
        <ImageElement attributes={attributes} element={element}>
          {children}
        </ImageElement>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
}

export default Element;
