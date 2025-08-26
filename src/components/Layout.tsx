
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../features/sidebar/sidebar'
import Icon from './Icon';
import DarkModeToggle from './DarkModeToggle';
import { IoMenu, IoClose } from "react-icons/io5";
import AppDarkLogo from "../assets/images/dark-logo.png"
import AppLogo from "../assets/images/logo.png"
import clsx from 'clsx';

const Layout: React.FC = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isBelowLg, setIsBelowLg] = useState(false);
    const location = useLocation();
    useEffect(() => {
        const mq = window.matchMedia('(max-width: 1199.98px)');
        const apply = () => setIsBelowLg(mq.matches);
        apply();
        mq.addEventListener('change', apply);
        return () => mq.removeEventListener('change', apply);
    }, []);
    useEffect(() => {
        if (!isBelowLg) setMobileOpen(false);
    }, [isBelowLg]);

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 1199.98px)');
        const apply = () => setIsBelowLg(mq.matches);
        apply();
        mq.addEventListener('change', apply);
        return () => mq.removeEventListener('change', apply);
    }, []);
    useEffect(() => {
        if (mobileOpen) setMobileOpen(false);
    }, [location.pathname]);



    return (
        <div className="flex flex-col h-screen">
            <header className="fixed w-full h-[75px] bg-white dark:bg-[#2C2D34] flex items-center border-b border-[#1D25301A] dark:border-black/20 z-50">
                <div className="flex items-center gap-3 px-4 md:border-e border-[#1D25301A] dark:border-black/20 h-full xl:min-w-[256px] xl:max-w-[256px] min-w-[200px] max-w-[200px]">
                    <button
                        type="button"
                        onClick={() => setMobileOpen(true)}
                        className="lg:hidden text-blue-default dark:text-white"
                        aria-label="Open sidebar"
                        title="Open sidebar"
                    >
                        <IoMenu size={24} />
                    </button>
                    <Link to="/dashboard" className='flex justify-center w-full'>
                        <img src={AppLogo} alt="logo" className=' w-[102px] dark:hidden' />
                        <img src={AppDarkLogo} alt="logo" className=' w-[102px] hidden dark:block' />
                    </Link>
                </div>
                <div className="flex-1 flex md:justify-between justify-end items-center xl:ps-8 md:ps-5 pe-4">
                    <div className='md:block hidden'>
                        <div className="text-lg font-medium text-dark-default dark:text-gray-100">Dashboard</div>
                        <div className="text-[#1D253080] dark:text-white/50 text-sm">Welcome back, Henry Anderson</div>
                    </div>

                    <div className="flex items-center gap-4 pe-2">
                        <DarkModeToggle />
                        <div className="hidden sm:flex justify-center items-center cursor-pointer gap-2 h-10 w-[86px] rounded-lg border border-blue-default text-base text-blue-default dark:border-white dark:text-white">
                            <Icon name='glob' />
                            <span className='uppercase'>ES</span>
                        </div>
                        <Link
                            to="/profile"
                            className="h-10 w-10 bg-blue-default dark:bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 dark:hover:bg-blue-500"
                            aria-label="Profile"
                        >
                            <Icon name='user' />
                        </Link>

                    </div>
                </div>
            </header>
            <div className="flex flex-1">
                <aside
                    className={clsx(
                        "hidden lg:block fixed top-[75px] h-[calc(100vh-75px)] z-40",
                        "xl:min-w-[256px] xl:max-w-[256px] min-w-[200px] max-w-[200px]",
                        "border-e border-[#1D25301A] bg-white text-dark-default",
                        "dark:border-black/20 dark:bg-[#2C2D34] dark:text-gray-100 overflow-auto"
                    )}
                >
                    <Sidebar />
                </aside>
                <aside
                    className={clsx(
                        "lg:hidden fixed top-[75px] left-0 h-[calc(100vh-75px)] w-[260px] z-50 transform transition-transform duration-300",
                        "border-e border-[#1D25301A] bg-white text-dark-default",
                        "dark:border-black/20 dark:bg-[#2C2D34] dark:text-gray-100 overflow-auto",
                        mobileOpen ? "translate-x-0" : "-translate-x-full"
                    )}
                    aria-hidden={!mobileOpen}
                >
                    <div className="flex items-center justify-between px-4 py-3 border-b border-black/10 dark:border-white/10">
                        <span className="text-sm font-medium text-[#1D2530] dark:text-white">Menu</span>
                        <button
                            type="button"
                            onClick={() => setMobileOpen(false)}
                            className="text-blue-default dark:text-white"
                            aria-label="Close sidebar"
                            title="Close sidebar"
                        >
                            <IoClose size={22} />
                        </button>
                    </div>
                    <Sidebar />
                </aside>
                {mobileOpen && (
                    <button
                        aria-label="Close menu"
                        className="lg:hidden fixed inset-0 top-[75px] bg-black/40 backdrop-blur-sm z-40"
                        onClick={() => setMobileOpen(false)}
                    />
                )}


                <main className={clsx(
                    "flex-1 min-w-0 overflow-y-auto pe-6 pt-[90px] pb-5",
                    "ps-5 lg:ps-[225px] xl:ps-[280px]"
                )}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;


































































// import React, { useEffect, useState } from 'react';
// import { Link, Outlet } from 'react-router-dom';
// import Sidebar from '../features/sidebar/sidebar';
// import Applogo from "../assets/images/logo.png";
// import Icon from './Icon';
// import DarkModeToggle from './DarkModeToggle';
// import { IoArrowBackCircle } from "react-icons/io5";
// import clsx from 'clsx';

// const Layout: React.FC = () => {

//     const [toggleSidebar, setToggleSidebar] = useState(false)




//     return (
//         <div className="flex flex-col h-screen">
//             <header className="fixed w-full h-[75px]
//     bg-white dark:bg-[#2C2D34]
//     flex justify-between items-center
//     border-b border-[#1D25301A] dark:border-black/20
//     z-50"
//             >
//                 {/* Logo section */}
//                 <div className="p-4 text-center border-e bord border-[#1D25301A] dark:border-black/20 mt-[11px] pb-[26px]
//       xl:min-w-[256px] xl:max-w-[256px] min-w-[200px] max-w-[200px] relative"
//                 >
//                     <img src={Applogo} alt="Logo" className="w-[96px] mx-auto" />
//                     <button onClick={() => setToggleSidebar(!toggleSidebar)} className='absolute start-3 bottom-2'><IoArrowBackCircle size={23} className={clsx('text-blue-default dark:text-white', toggleSidebar ? " rotate-180 duration-300" : "")} /></button>
//                 </div>

//                 {/* Content */}
//                 <div className="flex-1 flex justify-between items-center xl:px-8 px-6">
//                     {/* Title & subtitle */}
//                     <div>
//                         <div className="text-lg font-medium text-dark-default dark:text-gray-100">
//                             Dashboard
//                         </div>
//                         <div className="text-[#1D253080] dark:text-gray-400 text-sm">
//                             Welcome back, Henry Anderson
//                         </div>
//                     </div>

//                     {/* Actions */}
//                     <div className="flex items-center gap-8">
//                         {/* Language Switch */}
//                         <div className="flex justify-center items-center gap-2 h-10 w-[86px] rounded-lg
//           border border-blue-default text-base text-blue-default
//           dark:border-blue-400 dark:text-blue-400"
//                         >
//                             <Icon name="glob" />
//                             <span className="uppercase">ES</span>
//                         </div>

//                         {/* Profile Link */}
//                         <Link
//                             to="/profile"
//                             className="h-10 w-10 bg-blue-default dark:bg-blue-600
//             rounded-full flex items-center justify-center cursor-pointer
//             hover:bg-blue-700 dark:hover:bg-blue-500"
//                         >
//                             <Icon name="user" />
//                         </Link>
//                     </div>
//                 </div>
//                 <div className='pe-5'><DarkModeToggle /></div>
//             </header>


//             {/* Body: Sidebar + Main Content */}
//             <div className="flex flex-1"> {/* full height minus header */}
//                 <aside
//                     className={clsx(
//                         "transition-width duration-300 overflow-auto self-start z-50 h-screen fixed top-[73px] border-t",
//                         "border-e border-[#1D25301A] bg-white text-dark-default",
//                         "dark:border-black/20 dark:bg-[#2C2D34] dark:text-gray-100 ",
//                         toggleSidebar ? "min-w-0 duration-500 -translate-x-[300px]" : "xl:min-w-[256px] xl:max-w-[256px] min-w-[200px] max-w-[200px]"
//                     )}
//                 >

//                     <Sidebar toggleSidebar={toggleSidebar} />
//                 </aside>
//                 {/* Main content area */}
//                 <main className={clsx("flex-1 overflow-y-auto pe-6 pt-[90px] pb-5 duration-500", toggleSidebar ? "ps-5" : "xl:ps-[280px] ps-[225px]")}>
//                     <Outlet />
//                     {/* <footer className="mt-10 sticky">Footer content here</footer> */}
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default Layout;
