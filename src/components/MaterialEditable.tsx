import React, {useCallback, KeyboardEvent} from 'react';
import {Editable} from 'slate-react';
import {useEditor} from '../hooks';
import Leaf from './Leaf';
import Element from './Element';
import {isReactHotkey} from '../util/hotkey';
import {fillSpaces} from '../util/text';
import {noopFunc} from '../util/func';
import {
  FormControl,
  InputLabel,
  InputBaseProps,
  TextField,
  OutlinedInput,
} from '@material-ui/core';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

const TAB_SPACES = 4;

export interface MaterialEditableProps {
  onKeyDown?: (event: KeyboardEvent) => void;
  rows?: number;
  label?: string;
}

export function MaterialEditable(props: MaterialEditableProps): JSX.Element {
  const {label, onKeyDown = noopFunc, rows = 3} = props;

  const editor = useEditor();
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  const editableId = 'material-editable';

  return (
    // <FormControl variant="outlined">
    //   {label && (
    //     <InputLabel htmlFor={editableId} variant="outlined">
    //       {label}
    //     </InputLabel>
    //   )}
    <Editable
      renderElement={renderElement}
      renderLeaf={renderLeaf}
      placeholder={'Start typing...'}
      // autoFocus
      spellCheck
      rows={rows}
      id={editableId}
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
    // </FormControl>
  );
}

// export function MaterialEditable(props: MaterialEditableProps): JSX.Element {
//   const {label, rows = 3} = props;
//   return (
//     <TextField
//       label={label}
//       variant="outlined"
//       fullWidth
//       rows={rows}
//       margin="normal"
//       InputProps={{
//         inputComponent: function Editable(editableProps: any) {
//           return <MaterialEditableBase {...props} {...editableProps} />;
//         },
//       }}
//     />
//   );
// }

export default MaterialEditable;
