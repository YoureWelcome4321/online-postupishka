import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/mainPage";
import UserPage from "./pages/UserPage";
import Profile from "./pages/Profile";
import RegistrationLogin from "./pages/RegistrationLogin";
import { ThemeProvider } from "./ThemeContext";

function App() {
  return (
    <ThemeProvider>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/main" element={<UserPage />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/sign" element={<RegistrationLogin/>}/>
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
