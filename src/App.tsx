import { Provider } from "mobx-react";
import React, { Component, useEffect, useState } from "react";
import "./App.css";
import { Employer } from "./components/Employer";
import { SetupRootStore } from "./mst/setup";

interface Props {}

interface State {}

const App: React.FC = (Props: Props) => {
  const [rootTrees, setRootTrees] = useState<any>(null);

  useEffect(() => {
    const { rootTree } = SetupRootStore();
    // console.log({ rootTree });
    setRootTrees({ rootTree });
  }, []);

  if (!rootTrees) return null;
  return (
    <Provider rootTree={rootTrees.rootTree}>
      <div className="App">
        <p>Hi</p>
        <Employer />
      </div>
    </Provider>
  );
};

export default App;
