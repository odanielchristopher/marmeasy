import { HashRouter, Route, Routes } from 'react-router-dom';

import { AuthLayout } from '@renderer/views/layouts/AuthLayout';
import Clients from '@renderer/views/pages/Clients';
import Login from '@renderer/views/pages/Login';
import Orders from '@renderer/views/pages/Orders';
import Register from '@renderer/views/pages/Register';
import AuthGuard from './AuthGuard';

export default function AppRoutes(): JSX.Element {
    return (
        <HashRouter>
            <Routes>

                <Route element={<AuthGuard isPrivate={false} />}>
                  <Route element={<AuthLayout />}>
                    <Route path='/login' element={<Login />}/>
                    <Route path='/register' element={<Register />}/>
                  </Route>
                </Route>

                <Route element={<AuthGuard isPrivate />}>
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/" element={<Clients />} />
                </Route>

            </Routes>
        </HashRouter>
    );
};
