import { useState, useEffect } from 'react';
import { FarcasterIcon, LensIcon } from '../web3Icons/Web3Icons';
import ProfileSection from '../profileSection/ProfileSection';

const Sidebar = () => {
  const [trends, setTrends] = useState({
    usa: [
      { name: '#VOMZA', mentions: '178K' },
      { name: '#Olympics2026', mentions: '148K' }
    ],
    nigeria: [
      { name: '#PremierLeague', mentions: '40K' },
      { name: '#BurnaboyTour', mentions: '12K' }
    ]
  });

  return (
    <aside className="w-94 h-screen sticky top-0 ">
      <ProfileSection />

      <div className="mt-8 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Top Trends</h3>
        
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Trending in USA</h4>
          <ul className="space-y-4">
            {trends.usa.map((trend, index) => (
              <li key={index} className="flex justify-between items-center">
                <span className="font-medium text-blue-600">{trend.name}</span>
                <span className="text-sm text-gray-500">{trend.mentions} Mentions</span>
              </li>
            ))}
          </ul>
          <button className="text-blue-500 text-sm mt-2 hover:underline">More</button>
        </div>

        <div className="border-t border-gray-200 my-4"></div>

        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Trending in Nigeria</h4>
          <ul className="space-y-4">
            {trends.nigeria.map((trend, index) => (
              <li key={index} className="flex justify-between items-center">
                <span className="font-medium text-blue-600">{trend.name}</span>
                <span className="text-sm text-gray-500">{trend.mentions} Mentions</span>
              </li>
            ))}
          </ul>
          <button className="text-blue-500 text-sm mt-2 hover:underline">More</button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;