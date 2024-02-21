import React from "react";
import { StoreContext } from "storeon/react";
import store from "@store";
import "./App.css";

import Page from "@pages";

function App() {
  return (
    <StoreContext.Provider value={store}>
      <div className="App">
        <Page />
      </div>
    </StoreContext.Provider>
  );
}

export default App;
