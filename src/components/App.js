import React from "react";
import Search from "./Search";
import Listing from "./Listing";

import "../styles/App.css";

function App() {
  return (
    <React.Fragment>
      <Search />
      <Listing />
    </React.Fragment>
  );
}

export default App;
