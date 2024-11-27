import { Route, HashRouter as Router, Routes } from 'react-router-dom';

import Clients from './pages/Clients';
import EnterSystem from './pages/EnterSystem';
import Orders from './pages/Orders';

export default function AppRoutes(): JSX.Element {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<EnterSystem />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/clients" element={<Clients />} />
            </Routes>
        </Router>
    );
};
