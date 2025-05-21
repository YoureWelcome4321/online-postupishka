import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/mainPage";
import UserPage from "./pages/UserPage";
import RegistrationLogin from "./pages/RegistrationLogin";
import { ThemeProvider } from "./ThemeContext";
import SelectUniversity from "./components/materials/SelectUniversity";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/main" element={<UserPage />} />
          <Route path="/sign" element={<RegistrationLogin />} />
          <Route
            path="/materials/select-university"
            element={<SelectUniversity />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
