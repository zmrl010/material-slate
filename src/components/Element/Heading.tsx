import { RenderElementProps } from "slate-react";
import { HeadingElement } from "../../types";

export interface HeadingElementProps extends RenderElementProps {
  element: HeadingElement;
}

export function Heading(props: HeadingElementProps): JSX.Element {
  const { children, element, attributes } = props;

  const Tag = `h${element.level || 1}`;

  return <Tag {...attributes}>{children}</Tag>;
}

export default Heading;
