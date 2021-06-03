import React from "react";
import MaterialEditor from "./components/MaterialEditor";
import MaterialEditable from "./components/MaterialEditable";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";
import "./styles.css";
import Toolbar from "./components/Toolbar";

export default function App(): JSX.Element {
  return (
    <div className="App">
      <ScopedCssBaseline>
        <MaterialEditor>
          <Toolbar />
          <MaterialEditable />
        </MaterialEditor>
      </ScopedCssBaseline>
    </div>
  );
}
