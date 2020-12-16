import {ThemeProvider} from '@material-ui/core';
import React from 'react';
import MaterialEditor from './components/MaterialEditor';
import MaterialEditable from './components/MaterialEditable';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import {createMuiTheme} from '@material-ui/core/styles';
import './styles.css';
import Toolbar from './components/Toolbar';

const baseTheme = createMuiTheme({});

export default function App(): JSX.Element {
  return (
    <div className="App">
      <ThemeProvider theme={baseTheme}>
        <ScopedCssBaseline>
          <MaterialEditor>
            <Toolbar />
            <MaterialEditable />
          </MaterialEditor>
        </ScopedCssBaseline>
      </ThemeProvider>
    </div>
  );
}
