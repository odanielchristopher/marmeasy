import React from 'react';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';

import Clients from './pages/Clients';
import Orders from './pages/Orders';

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Orders />} />
                <Route path="/clients" element={<Clients />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
