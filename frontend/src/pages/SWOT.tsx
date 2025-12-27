import React from 'react';
// Tailwind CSS used instead of SWOT.css

const SWOT: React.FC = () => (
  <div className="max-w-3xl mx-auto p-6 md:p-10 bg-white rounded-xl shadow mt-8">
    <h1 className="text-3xl font-bold mb-4 text-blue-900">SWOT Analysis Tool</h1>
    <p className="text-gray-600 mb-8">Build and visualize your business SWOT analysis with AI-powered recommendations.</p>
    {/* TODO: Add interactive SWOT builder and visualization */}
    <div className="bg-yellow-100 text-yellow-800 rounded-lg p-6 text-center font-medium text-lg shadow-inner">
      Feature coming soon...
    </div>
  </div>
);

export default SWOT;
