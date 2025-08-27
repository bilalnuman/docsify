import { Link, NavLink } from "react-router-dom";
import AppLogo from "../../../assets/images/logo.png";
import AppDarkLogo from "../../../assets/images/dark-logo.png";
import DarkModeToggle from "../../../components/DarkModeToggle";
import BglightMode from "../../../assets/images/light_mode.png"

const Navbar = () => {
  const linkBase =
    "text-[#1D253080] dark:text-gray-300 hover:text-[#1556D4] dark:hover:text-white transition-colors";
  const btnBase =
    "px-4 py-2 rounded-xl font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300";

  return (
    <header className="bg-white z-50 relative dark:bg-[#2C2D34] border-b border-[#E5E7EB] dark:border-white/10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={AppLogo} alt="logo" className=' w-[102px] dark:hidden' />
          <img src={AppDarkLogo} alt="logo" className=' w-[102px] hidden dark:block' />
        </Link>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" end className={linkBase}>
            Home
          </NavLink>
          <a href="#pricing" className={linkBase}>
            Pricing
          </a>
          <NavLink to="/contactus" className={linkBase}>
            Contact Us
          </NavLink>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <DarkModeToggle />
          <Link
            to="/login"
            className={`${btnBase} md:block hidden border border-[#1556D4] text-[#1556D4] dark:!text-white hover:bg-blue-50 dark:hover:bg-white/10 dark:!border-white`}
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className={`${btnBase} bg-[#1556D4] hidden md:block dark:!bg-white dark:!text-dark-default text-white hover:bg-[#1556D4]/90`}
          >
            Sign Up
          </Link>

        </div>
      </div>
      {/* mobile links */}
      <div className="pb-4 md:hidden px-4">
        <nav className="flex items-center justify-between">
          <NavLink to="/" end className={linkBase}>
            Home
          </NavLink>
          <a href="#pricing" className={linkBase}>
            Pricing
          </a>
          <NavLink to="/contactus" className={linkBase}>
            Contact Us
          </NavLink>
          <Link
            to="/login"
            className={`${btnBase} md:hidden block text-dark-default dark:text-blue-default font-semibold !p-0 hover:bg-blue-50 dark:hover:bg-white/10 dark:!border-white`}
          >
            Sign In
          </Link>
        </nav>
      </div>
      {/* end mobile links */}
    </header>
  );
};

export default Navbar;



























































// import React from "react";
// import { Link } from "react-router-dom";

// import AppLogo from "../../../assets/images/logo.png"
// import DarkModeToggle from "../../../components/DarkModeToggle";

// const Navbar = () => {
//     return (
//         <header className="bg-white border-b">
//             <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//                 {/* Logo */}
//                 <div className="text-xl font-bold text-[#1556D4]">
//                     <img src={AppLogo} alt="logo" width={105} />
//                 </div>

//                 {/* Links */}
//                 <nav className="hidden md:flex space-x-8">
//                     <Link to="/" className="text-[#1D253080] hover:text-[#1556D4]">Home</Link>
//                     <a href="#pricing" className="text-[#1D253080] hover:text-[#1556D4]">Pricing</a>
//                     <Link to="/contactus" className="text-[#1D253080] hover:text-[#1556D4]">Contact Us</Link>
//                 </nav>

//                 {/* Buttons */}
//                 <div className="flex space-x-4">
//                     <Link to="/login" className="px-4 py-2 rounded-xl font-medium border border-[#1556D4] text-[#1556D4] hover:bg-blue-50">
//                         Sign In
//                     </Link>
//                     <Link to="/register" className="px-4 py-2 rounded-xl font-medium bg-[#1556D4] text-white hover:bg-blue-700">
//                         Sign Up
//                     </Link>
//                     <DarkModeToggle />
//                 </div>
//             </div>
//         </header>
//     );
// };

// export default Navbar;
