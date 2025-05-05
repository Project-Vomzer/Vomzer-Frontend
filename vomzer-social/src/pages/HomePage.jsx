import '../index.css';
import style from './HomePage.module.css';
import Header from "../components/header/Header.jsx";
import Sidebar from '../components/sidebar/Sidebar.jsx';
import ProfileFeed from '../components/profileFeed/ProfileFeed.jsx';

const HomePage = () => {
    return (
        <div className={`${style.home} min-h-screen bg-white text-gray-900 font-sans`}>
            <Header />
            
            <div className="flex ml-9 max-w-7xl mx-auto">
                {/* Left Sidebar - Fixed width */}
                <div className="hidden md:block w-94 flex-shrink-0 pr-4">
                    <Sidebar />
                </div>

                {/* Center Feed - Flexible width with max-width */}
                <div className="ml-50  border-gray-200 ">
                    <ProfileFeed />
                </div>

                {/* Right Sidebar - Hidden on smaller screens */}
                <div className="hidden lg:block w-80 pl-4">
                    {/* Add your right sidebar widgets here */}
                    <div className="sticky top-16 space-y-4">
                        <div className="bg-gray-50 p-4 rounded-xl">
                            <h3 className="font-bold mb-3">Who to follow</h3>
                            {/* Follow suggestions */}
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl">
                            <h3 className="font-bold mb-3">Trending in Web3</h3>
                            {/* Trending topics */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;