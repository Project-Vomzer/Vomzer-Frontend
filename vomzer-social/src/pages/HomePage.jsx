import '../index.css';
import style from './HomePage.module.css';
import Header from "../components/header/Header.jsx";
import Sidebar from '../components/sidebar/Sidebar.jsx';
import ProfileFeed from '../components/profileFeed/ProfileFeed.jsx';
import RightSidebar from '../components/rightSideBar/RightSideBar.jsx';

const HomePage = () => {
    return (
        <div className={`${style.home} min-h-screen text-gray-900 font-sans`}>
            <Header />
            
            <div className="flex">
                <div className="flex-shrink-0 hidden pl-2 py-4 md:block bg-opacity-90">
                    <Sidebar />
                </div>

                <div className="flex-1 min-w-0 px-6 border-gray-200">
                    <div className={`${style.feedBackground} pb-10`}>
                        
                        
                        <div className="mx-auto py-4">
                            <ProfileFeed />
                        </div>
                    </div>
                </div>

                <div className="hidden lg:block w-94 flex-shrink-0 ">
                    <div className="sticky pr-2 h-[calc(100vh-4rem)] overflow-y-auto">
                        <RightSidebar />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;