import React from 'react';

const ProfileSection = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">V</span>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900">VOMZER</h1>
        <p className="text-gray-500">@vomzer socials</p>
        
        <div className="mt-2">
          <p className="text-sm text-gray-700">Web3 Developer & Cybersecurity</p>
          <p className="text-xs text-gray-500">Enthusiast | Full-Time Legend</p>
        </div>
      </div>

      <div className="flex justify-between border-t border-b border-gray-100 py-4 mb-6">
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900">1,892</p>
          <p className="text-xs text-gray-500">Following</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900">4,273</p>
          <p className="text-xs text-gray-500">Followers</p>
        </div>
      </div>

      <button className="w-full py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors">
        My Profile
      </button>
    </div>
  );
};

export default ProfileSection;