import React from 'react';
// Tailwind CSS used instead of BudgetPlanner.css

const BudgetPlanner: React.FC = () => (
  <div className="max-w-3xl mx-auto p-6 md:p-10 bg-white rounded-xl shadow mt-8">
    <h1 className="text-3xl font-bold mb-4 text-blue-900">Budget Planner</h1>
    <p className="text-gray-600 mb-8">Plan your startup costs, project expenses, and calculate your runway.</p>
    {/* TODO: Add startup cost calculator, expense projections, scenario planning */}
    <div className="bg-yellow-100 text-yellow-800 rounded-lg p-6 text-center font-medium text-lg shadow-inner">
      Feature coming soon...
    </div>
  </div>
);

export default BudgetPlanner;
