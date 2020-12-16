import React, {useCallback, KeyboardEvent} from 'react';
import {Editable} from 'slate-react';
import {useEditor} from '../hooks';
import Leaf from './Leaf';
import Element from './Element';
import {isReactHotkey} from '../util/hotkey';
import {fillSpaces} from '../util/text';
import {Box} from '@material-ui/core';
import {noopFunc} from '../util/func';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

const TAB_SPACES = 4;

export interface MaterialEditableProps {
  onKeyDown?: (event: KeyboardEvent) => void;
}

export function MaterialEditable(props: MaterialEditableProps): JSX.Element {
  const {onKeyDown = noopFunc} = props;

  const editor = useEditor();
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  return (
    <Editable
      renderElement={renderElement}
      renderLeaf={renderLeaf}
      placeholder={'Start typing...'}
      autoFocus
      spellCheck
      rows={3}
      as={Box}
      onKeyDown={(event) => {
        for (const hotkey in HOTKEYS) {
          if (isReactHotkey(hotkey, event)) {
            event.preventDefault();
            const markType = HOTKEYS[hotkey as keyof typeof HOTKEYS];
            editor.toggleMark({type: markType});
          }
        }
        if (event.key === 'Tab') {
          event.preventDefault();
          editor.insertText(fillSpaces(TAB_SPACES));
        }
        onKeyDown(event);
      }}
    />
  );
}

export default MaterialEditable;
