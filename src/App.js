import React from "react";

import PathFindingVisualizer from "./components/PathFindingVisualizer";
import Header from "./components/Header/Header"
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header/>
      <PathFindingVisualizer />
    </div>
  );
}

export default App;
