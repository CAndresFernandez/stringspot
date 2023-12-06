import React from "react";
import "reset-css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </Router>
  );
};

export default App;
