import { createStyles, makeStyles } from "@material-ui/core";
import { RenderElementProps, useFocused, useSelected } from "slate-react";
import { ImageElement } from "../../plugins";
import { theme } from "../../theme";

const useStyles = makeStyles(
  () =>
    createStyles({
      image: {
        display: "block",
        maxWidth: "100%",
        maxHeight: "20em",
        boxShadow: (props: { selected: boolean; focused: boolean }) =>
          props.selected && props.focused ? "0 0 0 3px #B4D5FF" : "none",
      },
    }),
  { name: "Image", defaultTheme: theme }
);

export interface ImageElementProps extends RenderElementProps {
  element: ImageElement;
}

export function Image(props: ImageElementProps): JSX.Element {
  const { attributes, children, element } = props;
  const selected = useSelected();
  const focused = useFocused();
  const classes = useStyles({ selected, focused });

  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <img alt={element.alt} src={element.url} className={classes.image} />
      </div>
      {children}
    </div>
  );
}
