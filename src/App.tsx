import {ThemeProvider} from '@material-ui/core';
import React from 'react';
import Editor from './components/Editor';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';

import {createMuiTheme} from '@material-ui/core/styles';
import './styles.css';

const baseTheme = createMuiTheme({});

export default function App(): JSX.Element {
  return (
    <div className="App">
      <ThemeProvider theme={baseTheme}>
        <ScopedCssBaseline>
          <Editor />
        </ScopedCssBaseline>
      </ThemeProvider>
    </div>
  );
}
