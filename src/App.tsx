import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import AdminRoute from "./components/AdminRoute";
import RoleRoute from "./components/RoleRoute";

import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import ForgotPasswordPage from "./features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "./features/auth/pages/ResetPasswordPage";
import LandingPage from "./pages/landing";
import ContactUs from "./pages/contactUs";
import Layout from "./components/Layout";
import Dashboard from "./pages/dashboard";
import Traingin from "./pages/traingin";
import FallingDebris from "./pages/falling-debris";
import TrainingGenerator from "./pages/trainingenerator";
import SafetyMeetings from "./pages/safety-meetings";
import TopicMeetingGenerator from "./pages/topic-meeting-generator";
import SafetyPreview from "./pages/SafetyPreview";
import Resources from "./pages/resources";
import ResourcesPreview from "./pages/resources-previw";
import { TeamMembers } from "./pages/team-members";
import SupportRequestForm from "./pages/support-request-form";
import SubscriptionPage from "./pages/subscription";
import Profile from "./pages/profile";
import FolderDetail from "./pages/folder/[id]/page";
import AcceptInvitation from "@/pages/accept-invitation";
import SignedDocuments from "./pages/signed-documents";
import PrivacyPlocy from "./pages/PrivacyPlocy";
import TermsCondition from "./pages/TermsCondition";
// *150#


const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="contactus" element={<ContactUs />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route path="accept-invitation/:token" element={<AcceptInvitation />} />
          <Route path="privacy-policy" element={<PrivacyPlocy />} />
          <Route path="terms-and-condition" element={<TermsCondition />} />
        </Route>

        {/* Protected / App routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />

            <Route element={<RoleRoute deny={["viewer"]} redirectTo="/dashboard" />}>
              <Route path="training" element={<Traingin />} />
              <Route path="training/falling-debris" element={<FallingDebris />} />
              <Route path="training/training-generator" element={<TrainingGenerator />} />
              <Route path="training/folder/:id" element={<FolderDetail />} />
            </Route>

            <Route element={<RoleRoute deny={["viewer"]} redirectTo="/dashboard" />}>
              <Route path="safety-meetings" element={<SafetyMeetings />} />
              <Route path="safety-meetings/topic-meeting-generator" element={<TopicMeetingGenerator />} />
              <Route path="safety-meetings/preview/:id" element={<SafetyPreview />} />
              <Route path="signed-documents/:id" element={<SignedDocuments />} />
            </Route>

            {/* Open to all authenticated users */}
            <Route path="resources" element={<Resources />} />
            <Route path="resources/:id" element={<ResourcesPreview />} />
            <Route path="profile" element={<Profile />} />
            <Route path="help" element={<SupportRequestForm />} />

            {/* 👮 Admin-only */}
            <Route element={<AdminRoute redirectTo="/dashboard" />}>
              <Route path="team-members" element={<TeamMembers />} />
              <Route path="subscription" element={<SubscriptionPage />} />
            </Route>
          </Route>
        </Route>
        {/* Catch-all */}
        <Route path="*" element={<div><p>404 Not Found</p></div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
