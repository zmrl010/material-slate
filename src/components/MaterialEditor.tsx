import React, {useState, ReactNode} from 'react';
import {Node} from 'slate';
import {Slate} from 'slate-react';
import useEditor from '../hooks/useEditor';
import {noopFunc} from '../util/func';

const getPlainNode = (value: string) => [
  {
    type: 'paragraph',
    children: [{text: value}],
  },
];

export interface MaterialEditorProps {
  onChange?: (value: Node[]) => void;
  value?: Node[];
  children: ReactNode;
}

/**
 * Material UI Slate rich text editor
 * TODO save on edit or save button?
 * @param props
 */
export function MaterialEditor(props: MaterialEditorProps): JSX.Element {
  const {onChange = noopFunc, value = [], children} = props;

  const editor = useEditor();

  const handleChange = (newValue: Node[]) => {
    onChange(newValue);
  };

  return (
    <Slate editor={editor} value={value} onChange={handleChange}>
      {children}
    </Slate>
  );
}

export default MaterialEditor;
