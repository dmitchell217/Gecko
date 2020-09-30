import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import LeaderListView from 'src/views/social/LeaderListView';
import LeaderDashboard from 'src/views/LeaderDashboard';
import LoginView from 'src/views/auth/SignupLoginForm';
import NotFoundView from 'src/views/errors/NotFoundView';
import AutomationStepper from 'src/views/automation';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import PortfolioView from 'src/views/PortfolioView';
import FollowerDashboard from './views/FollowerDashboard';
import FollowerSocialView from './views/social/FollowerSocialView';
import SignUpLoginForm from 'src/views/auth/SignupLoginForm';

 //
// 

let routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <SignUpLoginForm /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/user/dashboard" /> }, //NEEDS TO BE CHANGED!
      { path: '*', element: <Navigate to="/404" /> }
    ] 
  }
];
// let userID = localStorage.getItem('id');
// let isLeader = localStorage.getItem('leader');

const setRoutes = u => {
  if (true) {

    routes.push({
      path: 'user',
      element: <DashboardLayout />,
      children: [
        { path: 'account', element: <AccountView /> },
        { path: 'social', element: <LeaderListView /> },
        { path: 'test', element: <RegisterView/> },
        { path: 'dashboard', element: <LeaderDashboard /> },
        { path: 'automations', element: <AutomationStepper /> },
        { path: 'settings', element: <SettingsView /> },
        { path: 'portfolio', element: <PortfolioView /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    });
  } else {
    routes.push({
      path: 'user',
      element: <DashboardLayout />,
      children: [
        { path: 'account', element: <AccountView /> },
        { path: 'social', element: <FollowerSocialView /> },
        { path: 'dashboard', element: <FollowerDashboard /> },
        { path: 'automations', element: <AutomationStepper /> },
        { path: 'settings', element: <SettingsView /> },
        { path: 'portfolio', element: <PortfolioView /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    });
  }
};
setRoutes(localStorage.getItem('leader'));

export default routes;
