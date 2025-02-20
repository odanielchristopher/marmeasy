import { HashRouter, Route, Routes } from 'react-router-dom';

import { DashboardProvider } from '@renderer/app/contexts/DashboardContext';

import { AuthLayout } from '@renderer/views/layouts/AuthLayout';
import PageLayout from '@renderer/views/layouts/PageLayout';
import Clients from '@renderer/views/pages/Clients';
import Login from '@renderer/views/pages/Login';
import Menu from '@renderer/views/pages/Menu';
import Orders from '@renderer/views/pages/Orders';
import Register from '@renderer/views/pages/Register';

import Dashboard from '@renderer/views/pages/Dashboard';
import AuthGuard from './AuthGuard';

export default function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route element={<PageLayout />}>
            <Route path="/menu" element={<Menu />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/" element={<Clients />} />

            <Route
              path="/dashboard"
              element={
                <DashboardProvider>
                  <Dashboard />
                </DashboardProvider>
              }
            />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}
