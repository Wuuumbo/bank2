import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import CompaniesPage from './pages/Companies/CompaniesPage';
import StatisticsPage from './pages/Statistics/StatisticsPage';
import FinancialPage from './pages/Financial/FinancialPage';
import ServicesPage from './pages/Services/ServicesPage';
import { CompaniesProvider } from './context/CompaniesContext';

function App() {
  return (
    <CompaniesProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/financial" element={<FinancialPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
          </Routes>
        </Layout>
      </Router>
    </CompaniesProvider>
  );
}

export default App;