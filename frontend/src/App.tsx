import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';

import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Contacts from './pages/Contacts';
import Expenses from './pages/Expenses';
import BusinessIdeation from './pages/BusinessIdeation';
import BusinessPlan from './pages/BusinessPlan';
import MarketAnalysis from './pages/MarketAnalysis';
import SWOT from './pages/SWOT';
import LegalGuidance from './pages/LegalGuidance';
import BudgetPlanner from './pages/BudgetPlanner';
import UserProfile from './pages/UserProfile';
import Layout from './components/Layout';
// Tailwind CSS used instead of App.css

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('token');
  return token ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="business-ideation" element={<BusinessIdeation />} />
          <Route path="business-plan" element={<BusinessPlan />} />
          <Route path="market-analysis" element={<MarketAnalysis />} />
          <Route path="swot" element={<SWOT />} />
          <Route path="legal-guidance" element={<LegalGuidance />} />
          <Route path="budget-planner" element={<BudgetPlanner />} />
          <Route path="user-profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
