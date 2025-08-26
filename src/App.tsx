import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import FallingDebris from './pages/falling-debris';
import TrainingGenerator from './pages/trainingenerator';
import SafetyMeetings from './pages/safety-meetings';
import Profile from './pages/profile';
import LoginPage from './features/auth/pages/LoginPage';
import RegisterPage from './features/auth/pages/RegisterPage';
import Landing from './pages/landing';
import { TeamMembers } from './pages/team-members';
import SupportRequestForm from './pages/support-request-form';
import TrainingPreview from './pages/TrainingPreview';
import SafetyPreview from './pages/SafetyPreview';
import TopicMeetingGenerator from './pages/topic-meeting-generator';
import ResourcesPreviw from './pages/resources-previw';
import SubscriptionPage from './pages/subscription';
import ForgotPassword from './pages/forgot-password';
import ResetPassword from './pages/reset-password';
import ProtectedRoute from './components/ProtectedRoute';
import ContactUs from './pages/contactUs';
import Dashboard from './pages/dashboard';
import Traingin from './pages/traingin';
import Resources from './pages/resources';
import { getCookie } from './util/cookies';
import PublicRoute from './components/PublicRoute';
import AdminRoute from './components/AdminRoute';
import AcceptInvitation from './pages/accept-invitation';

const App: React.FC = () => {
  const token = getCookie("access_token");
  const isLoggedIn = Boolean(token);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Landing />} />
          <Route path="contactus" element={<ContactUs />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>

        {/* Protected / App routes */}
        <Route element={<ProtectedRoute isAuth={isLoggedIn} />}>
          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="training" element={<Traingin />} />
            <Route path="training/preview/:id" element={<TrainingPreview />} />
            <Route path="training/falling-debris" element={<FallingDebris />} />
            <Route path="training/training-generator" element={<TrainingGenerator />} />
            <Route path="safety-meetings" element={<SafetyMeetings />} />
            <Route path="accept-invitation/:id" element={<AcceptInvitation />} />
            <Route path="safety-meetings/topic-meeting-generator" element={<TopicMeetingGenerator />} />
            <Route path="safety-meetings/preview/:id" element={<SafetyPreview />} />
            <Route path="resources" element={<Resources />} />
            <Route path="resources/:id" element={<ResourcesPreviw />} />
            <Route path="profile" element={<Profile />} />
            <Route path="help" element={<SupportRequestForm />} />

            {/* Admin-only routes */}
            <Route element={<AdminRoute redirectTo="/dashboard" />}>
              <Route path="teamMembers" element={<TeamMembers />} />
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
