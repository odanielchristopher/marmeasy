import Clients from '@renderer/pages/Clients';
import EnterSystem from '@renderer/pages/EnterSystem';
import Orders from '@renderer/pages/Orders';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';

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
