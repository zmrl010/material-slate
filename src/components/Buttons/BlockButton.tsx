import {ToggleButton} from './ToggleButton';
import React from 'react';
import {useMaterialSlate} from '../../hooks';
import {ButtonProps} from '@material-ui/core';

interface Props extends ButtonProps {
  format: string;
}

export default function BlockButton({
  children,
  format,
  ...props
}: Props): JSX.Element {
  const editor = useMaterialSlate();

  return (
    <ToggleButton
      value={format}
      selected={editor.isBlockActive({type: format})}
      onMouseDown={(e) => {
        e.preventDefault();
        editor.toggleBlock({type: format});
      }}
      {...props}
    >
      {children}
    </ToggleButton>
  );
}
