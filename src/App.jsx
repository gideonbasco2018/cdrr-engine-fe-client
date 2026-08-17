import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import MyApplicationsPage from "./pages/MyApplicationsPage";
import DocumentsPage from "./pages/DocumentsPage";
import CompanyProfilePage from "./pages/CompanyProfilePage";
import NewApplicationPage from "./pages/applications/NewApplicationPage";
import ComingSoonPage from "./pages/applications/ComingSoonPage";
import VerifyAppointmentPage from "./pages/applications/miv-n/VerifyAppointmentPage";
import ApplicationWizardPage from "./pages/applications/miv-n/ApplicationWizardPage";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />

          <Route path="/applications" element={<MyApplicationsPage />} />
          <Route path="/applications/new" element={<NewApplicationPage />} />
          <Route
            path="/applications/new/fgmp"
            element={
              <ComingSoonPage
                title="FGMP - Coming Soon"
                message="Foreign Good Manufacturing Practices applications aren't available yet. Please check back later."
              />
            }
          />
          <Route
            path="/applications/new/miv-n"
            element={<VerifyAppointmentPage />}
          />
          <Route
            path="/applications/new/miv-n/apply"
            element={<ApplicationWizardPage />}
          />

          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/profile" element={<CompanyProfilePage />} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}
