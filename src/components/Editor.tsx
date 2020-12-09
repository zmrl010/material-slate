import React, {useCallback, useState, KeyboardEvent} from 'react';
import {Node} from 'slate';
import {Slate, Editable} from 'slate-react';
import Element from './Element';
import Leaf from './Leaf';
import Toolbar from './Toolbar';
import useEditor from '../hooks/useEditor';
import {Box} from '@material-ui/core';
import {fillSpaces} from '../util/text';
import {noopFunc} from '../util/func';
import {isReactHotkey} from '../util/hotkey';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

interface Config {
  tabSpaces: number;
  showToolbar?: 'always' | 'hover';
}

const defaultConfig: Config = {
  tabSpaces: 4,
};

const getPlainNode = (value: string) => [
  {
    type: 'paragraph',
    children: [{text: value}],
  },
];

interface Props {
  onChange?: (value: Node[]) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  value?: string;
  config?: Config;
}

/**
 * Material UI Slate rich text editor
 * TODO save on edit or save button?
 * @param props
 */
export default function Editor(props: Props): JSX.Element {
  const {
    onChange = noopFunc,
    onKeyDown = noopFunc,
    value,
    config: userConfig,
  } = props;
  const [currentValue, setCurrentValue] = useState<Node[]>(() =>
    value ? JSON.parse(value) : getPlainNode('')
  );
  const config = {...defaultConfig, userConfig};

  const editor = useEditor();
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  const handleChange = (newValue: Node[]) => {
    onChange(newValue);
    setCurrentValue(newValue);
  };

  return (
    <Box>
      <Slate editor={editor} value={currentValue} onChange={handleChange}>
        <Toolbar />
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
              editor.insertText(fillSpaces(config.tabSpaces));
            }
            onKeyDown(event);
          }}
        />
      </Slate>
    </Box>
  );
}
