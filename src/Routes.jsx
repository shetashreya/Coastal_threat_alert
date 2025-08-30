import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import MainDashboard from './pages/main-dashboard';
import LoginPage from './pages/login';
import SystemAdministration from './pages/system-administration';
import EnvironmentalDataAnalytics from './pages/environmental-data-analytics';
import CommunityAlertCenter from './pages/community-alert-center';
import AlertManagement from './pages/alert-management';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AlertManagement />} />
        <Route path="/main-dashboard" element={<MainDashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/system-administration" element={<SystemAdministration />} />
        <Route path="/environmental-data-analytics" element={<EnvironmentalDataAnalytics />} />
        <Route path="/community-alert-center" element={<CommunityAlertCenter />} />
        <Route path="/alert-management" element={<AlertManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
