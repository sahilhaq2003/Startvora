import React from 'react';
// Tailwind CSS used instead of UserProfile.css

const UserProfile: React.FC = () => (
  <div className="max-w-3xl mx-auto p-6 md:p-10 bg-white rounded-xl shadow mt-8">
    <h1 className="text-3xl font-bold mb-4 text-blue-900">User Profile</h1>
    <p className="text-gray-600 mb-8">Manage your account, preferences, and business information.</p>
    {/* TODO: Add user info, settings, and business details */}
    <div className="bg-yellow-100 text-yellow-800 rounded-lg p-6 text-center font-medium text-lg shadow-inner">
      Feature coming soon...
    </div>
  </div>
);

export default UserProfile;
