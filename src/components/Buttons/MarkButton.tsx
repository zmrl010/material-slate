import React from 'react';
import {useMaterialSlate} from '../../hooks';
import {ToggleButton} from './ToggleButton';
import {ButtonProps} from '@material-ui/core';

interface Props extends ButtonProps {
  format: string;
}

export default function MarkButton({
  children,
  format,
  ...props
}: Props): JSX.Element {
  const editor = useMaterialSlate();

  return (
    <ToggleButton
      value={format}
      selected={editor.isMarkActive({type: format})}
      onMouseDown={(e) => {
        e.preventDefault();
        editor.toggleMark({type: format});
      }}
      {...props}
    >
      {children}
    </ToggleButton>
  );
}
