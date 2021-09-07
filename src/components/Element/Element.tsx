import React from "react";
import { RenderElementProps } from "slate-react";
import { Image } from "./Image";
import useIsKeyPressed from "../../hooks/useIsKeyPressed";
import { Link } from "@material-ui/core";
import { Heading } from "./Heading";

export type ElementProps = RenderElementProps;

export function Element(props: ElementProps): JSX.Element {
  const { attributes, children, element } = props;

  const isCtrlPressed = useIsKeyPressed("Control");

  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading":
      return (
        <Heading attributes={attributes} element={element}>
          {children}
        </Heading>
      );
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
        <Image attributes={attributes} element={element}>
          {children}
        </Image>
      );
    case "paragraph":
    default:
      return <p {...attributes}>{children}</p>;
  }
}

export default Element;
