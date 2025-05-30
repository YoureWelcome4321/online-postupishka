import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import UserPage from "./pages/UserPage";
import RegistrationLogin from "./pages/RegistrationLogin";
import { ThemeProvider } from "./ThemeContext";
import EmailVerification from "./pages/EmailVerification";
import PleaseCheckEmail from "./pages/PleaseCheckEmail";
import PrivacyPolicy from "./pages/Terms";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/main" element={<UserPage />} />
          <Route path="/sign" element={<RegistrationLogin />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/check-email" element={<PleaseCheckEmail />} />
          <Route path="/terms" element={<PrivacyPolicy />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
