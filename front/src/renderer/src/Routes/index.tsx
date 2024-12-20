import { HashRouter, Route, Routes } from 'react-router-dom';

import { AuthLayout } from '@renderer/views/layouts/AuthLayout';
import PageLayout from '@renderer/views/layouts/PageLayout';
import Clients from '@renderer/views/pages/Clients';
import Login from '@renderer/views/pages/Login';
import Menu from '@renderer/views/pages/Menu';
import Register from '@renderer/views/pages/Register';
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
            <Route path="/" element={<Clients />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}
