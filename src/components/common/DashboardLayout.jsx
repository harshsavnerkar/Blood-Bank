import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Notifications from "./Notifications";

const DashboardLayout = () => {
  const location = useLocation();

  // Don't show notifications on auth-related pages
  const showNotifications = !["/", "/auth", "/role-selection"].includes(
    location.pathname
  );

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Global notification area - only show on dashboard pages */}
      {showNotifications && (
        <div className="fixed top-4 right-4 z-50">
          <Notifications />
        </div>
      )}

      {/* Main content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
