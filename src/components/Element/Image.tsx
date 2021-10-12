import { styled } from "@mui/material/styles";
import { RenderElementProps, useFocused, useSelected } from "slate-react";
import { ImageElement } from "../../plugins";

const PREFIX = "Image";

const classes = {
  image: `${PREFIX}-image`,
};

interface RootProps {
  selected: boolean;
  focused: boolean;
}

const Root = styled("div", {
  shouldForwardProp: (prop) => prop !== "selected" && prop !== "focused",
})<RootProps>(({ selected, focused }) => ({
  [`& .${classes.image}`]: {
    display: "block",
    maxWidth: "100%",
    maxHeight: "20em",
    ...(selected &&
      focused && {
        boxShadow: "0 0 0 3px #B4D5FF",
      }),
  },
}));

export interface ImageElementProps extends RenderElementProps {
  element: ImageElement;
}

export function Image(props: ImageElementProps): JSX.Element {
  const { attributes, children, element } = props;
  const selected = useSelected();
  const focused = useFocused();

  return (
    <Root {...attributes} selected={selected} focused={focused}>
      <div contentEditable={false}>
        <img alt={element.alt} src={element.url} className={classes.image} />
      </div>
      {children}
    </Root>
  );
}
