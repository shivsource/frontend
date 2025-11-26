// import './App.css'
import { useState } from "react";
import CheckboxesTree from "./components/Checkboxestree.jsx";
import Checklist from "./components/Checklist.jsx";
import Tree from "./components/Tree.jsx";
import { checkboxData } from "./api/data.json";

function App() {
  const [checked, setChecked] = useState({});

  return (
    <>
      {/* <Tree /> */}
      <CheckboxesTree
        data={checkboxData}
        checked={checked}
        setChecked={setChecked}
      />
      {/* <Checklist /> */}
    </>
  );
}

export default App;
