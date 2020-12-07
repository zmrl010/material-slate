import React, {useCallback, useState} from 'react';
import {Node} from 'slate';
import {Slate, Editable} from 'slate-react';
import Element from './Element';
import Leaf from './Leaf';
import Toolbar from './Toolbar';
import useEditor from '../hooks/useEditor';
import isHotkey from 'is-hotkey';
import {Box} from '@material-ui/core';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

function fillSpaces(numSpaces: number) {
  return Array.from({length: numSpaces}).fill(' ').join('');
}

interface Config {
  tabSpaces: number;
}

const defaultConfig: Config = {
  tabSpaces: 4,
};

interface Props {
  defaultValue?: string;
  config?: Config;
}

/**
 * Material UI Slate rich text editor
 * TODO save on edit or save button?
 * @param props
 */
export default function Editor(props: Props): JSX.Element {
  const {defaultValue = 'default', config: userConfig} = props;
  const [value, setValue] = useState<Node[]>([
    {
      type: 'paragraph',
      children: [{text: defaultValue}],
    },
  ]);
  const config = {...defaultConfig, userConfig};
  const editor = useEditor();
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  return (
    <Box>
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      >
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
              if (isHotkey(hotkey, (event as unknown) as KeyboardEvent)) {
                event.preventDefault();
                const markType = HOTKEYS[hotkey as keyof typeof HOTKEYS];
                editor.toggleMark({type: markType});
              }
            }
            if (event.key === 'Tab') {
              event.preventDefault();
              editor.insertText(fillSpaces(config.tabSpaces));
            }
          }}
        />
      </Slate>
    </Box>
  );
}
