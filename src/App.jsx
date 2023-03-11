import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Quiz from "./screens/quiz";
import Welcome from "./screens/welcome";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
