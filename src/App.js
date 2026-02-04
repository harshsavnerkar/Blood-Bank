import "./styles/globals.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import pages
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import RoleSelectionPage from "./pages/RoleSelectionPage";
import HospitalDashboard from "./pages/HospitalDashboard";
import DonorDashboard from "./pages/DonorDashboard";
import PatientDashboard from "./pages/PatientDashboard";

// Import contexts
import { LanguageProvider } from "./contexts/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/role-selection" element={<RoleSelectionPage />} />
            <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
            <Route path="/donor-dashboard" element={<DonorDashboard />} />
            <Route path="/patient-dashboard" element={<PatientDashboard />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
