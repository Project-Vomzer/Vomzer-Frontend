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
  PlusIcon,
  MenuIcon,
  XIcon
} from '../Icons';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex items-center">
            <button
              className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
            
            <Link to="/" className="ml-2 md:ml-0 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">VZ</span>
              </div>
              <span className="ml-2 text-xl font-bold hidden sm:block">VOMZER</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-2 lg:space-x-6">
            <button 
              onClick={() => setActiveTab('home')}
              className={`p-2 rounded-lg ${activeTab === 'home' ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
              aria-label="Home"
            >
              <HomeIcon active={activeTab === 'home'} />
            </button>
            
            <button 
              onClick={() => setActiveTab('explore')}
              className={`p-2 rounded-lg ${activeTab === 'explore' ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
              aria-label="Explore"
            >
              <CompassIcon active={activeTab === 'explore'} />
            </button>
            
            <button 
              onClick={() => setActiveTab('create')}
              className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg"
              aria-label="Create"
            >
              <PlusIcon />
            </button>
            
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`p-2 rounded-lg ${activeTab === 'notifications' ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
              aria-label="Notifications"
            >
              <BellIcon active={activeTab === 'notifications'} />
            </button>
            
            <button 
              onClick={() => setActiveTab('messages')}
              className={`p-2 rounded-lg ${activeTab === 'messages' ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
              aria-label="Messages"
            >
              <MailIcon active={activeTab === 'messages'} />
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <SunIcon className="w-5 h-5 text-yellow-400" />
              ) : (
                <MoonIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
            
            <button 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="User profile"
            >
              <UserIcon />
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => {
                setActiveTab('home');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center px-3 py-2 rounded-md text-base font-medium ${
                activeTab === 'home' 
                  ? 'bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <HomeIcon className="mr-3" active={activeTab === 'home'} />
              Home
            </button>
            
            <button
              onClick={() => {
                setActiveTab('explore');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center px-3 py-2 rounded-md text-base font-medium ${
                activeTab === 'explore' 
                  ? 'bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <CompassIcon className="mr-3" active={activeTab === 'explore'} />
              Explore
            </button>
            
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;