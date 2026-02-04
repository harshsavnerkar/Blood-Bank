import React from "react";
import { Outlet } from "react-router-dom";
import Notifications from "./Notifications";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Global notification area */}
      <div className="fixed top-4 right-4 z-50">
        <Notifications />
      </div>

      {/* Main content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
