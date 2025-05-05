import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HomeIcon, 
  CompassIcon, 
  BellIcon, 
  MailIcon,
  SunIcon,
  MoonIcon,
  UserIcon,
  PlusIcon
} from '../Icons'; 

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">VZ</span>
            </div>
          </Link>

          {/* Icon Navigation */}
          <nav className="flex items-center space-x-6">
            <button 
              onClick={() => setActiveTab('home')}
              className={`p-2 rounded-lg ${activeTab === 'home' ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
            >
              <HomeIcon active={activeTab === 'home'} />
            </button>
            
            <button 
              onClick={() => setActiveTab('explore')}
              className={`p-2 rounded-lg ${activeTab === 'explore' ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
            >
              <CompassIcon active={activeTab === 'explore'} />
            </button>
            
            <button 
              onClick={() => setActiveTab('create')}
              className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg"
            >
              <PlusIcon />
            </button>
            
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`p-2 rounded-lg ${activeTab === 'notifications' ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
            >
              <BellIcon active={activeTab === 'notifications'} />
            </button>
            
            <button 
              onClick={() => setActiveTab('messages')}
              className={`p-2 rounded-lg ${activeTab === 'messages' ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
            >
              <MailIcon active={activeTab === 'messages'} />
            </button>
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {darkMode ? (
                <SunIcon className="w-5 h-5 text-yellow-400" />
              ) : (
                <MoonIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
            
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <UserIcon />
            </button>
            
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;