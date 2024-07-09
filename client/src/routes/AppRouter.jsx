import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import DashboardPage from "../pages/DashboardPage";
import EmployeesPage from "../pages/EmployeePage";
import ProjectPage from "../pages/ProjectPage";
import ApprovalRequestPage from "../pages/ApprovalRequestPage";
import LeaveRequestPage from "../pages/LeaveRequestPage";

import NotFoundPage from "../pages/NotFoundPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard/:role" element={<DashboardPage />} />
      <Route path="/employees/:role" element={<EmployeesPage />} />
      <Route path="/projects/:role" element={<ProjectPage />} />
      <Route
        path="/approval-requests/:role"
        element={<ApprovalRequestPage />}
      />
      <Route path="/leave-requests/:role" element={<LeaveRequestPage />} />

      {/* NOT FOUND ROUTE */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;
