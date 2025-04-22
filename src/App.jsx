import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/mainPage";
import UserPage from "./pages/UserPage";
import { ThemeProvider } from "./ThemeContext";

function App() {
  return (
    <ThemeProvider>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/main" element={<UserPage />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
