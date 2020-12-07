import {makeStyles} from '@material-ui/core';
import React from 'react';
import type {Text} from 'slate';
import type {RenderLeafProps} from 'slate-react';

const useStyles = makeStyles({
  fill: {
    backgroundColor: (props: {fill?: boolean}) => {
      return props.fill ? 'yellow' : '';
    },
  },
});

interface Leaf extends Text {
  bold?: boolean;
  code?: boolean;
  italic?: boolean;
  underline?: boolean;
  fill?: boolean;
}

interface LeafProps extends RenderLeafProps {
  leaf: Leaf;
}

export default function Leaf(props: LeafProps): JSX.Element {
  const {attributes, leaf} = props;
  let {children} = props;
  const classes = useStyles(leaf);

  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = (
      <pre>
        <code>{children}</code>
      </pre>
    );
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return (
    <span {...attributes} className={classes.fill}>
      {children}
    </span>
  );
}
