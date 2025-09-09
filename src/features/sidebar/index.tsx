import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import clsx from "clsx";
import Button from "../../components/Button";
import { AiOutlineLogout } from "react-icons/ai";
import { deleteCookie } from "../../util/cookies";


type SubMenu = {
  label: string;
  path: string;
  icon?: React.ReactNode;
};

type MenuItem = {
  label: string;
  path: string;
  icon?: React.ReactNode;
  subMenu?: SubMenu[];
};

interface SidebarProps {
  logo?: React.ReactNode | string;
  menuItems: MenuItem[];
  sticky?: boolean;
  logoClassName?: string;
  toggleSidebar?: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ logo, menuItems, sticky = true, toggleSidebar = false, logoClassName = "" }) => {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<string>("");
  const navigate = useNavigate();

  const toggleMenu = (path: string) => {
    setOpenMenu((prev) => (prev === path ? "" : path));
  };

  const isRouteActive = (item: MenuItem) => {
    if (location.pathname === item.path || location.pathname.startsWith(item.path + "/")) {
      return true;
    }
    if (item.subMenu) {
      return item.subMenu.some(
        (sub) => location.pathname === sub.path || location.pathname.startsWith(sub.path + "/")
      );
    }
    return false;
  };

  const handleLogout = () => {
    deleteCookie("access_token");
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };


  useEffect(() => {
    const matchedMenuItem = menuItems.find((item) => isRouteActive(item));
    if (matchedMenuItem) setOpenMenu(matchedMenuItem.path);
  }, [location.pathname, menuItems]);
  
  return (
    <div className="h-full relative">

      {logo && (
        <div className={clsx("px-6 py-4 border-b border-[#1D25301A] dark:border-black/20", logoClassName)}>
          {logo}
        </div>
      )}

      <nav className="xl:px-6 px-3 pt-4">
        {menuItems.map((item) => {
          const isActiveMain = isRouteActive(item);
          const isSubMenuOpen = openMenu === item.path;

          return (
            <div key={item.path}>
              <Link
                to={item.subMenu ? "#" : item.path}
                onClick={() => item.subMenu && toggleMenu(item.path)}
                className={clsx(
                  "!font-normal flex items-center px-4 xl:py-4 py-3 mb-1 cursor-pointer no-underline justify-between capitalize rounded-xl transition-colors duration-200",
                  // base text colors
                  isActiveMain
                    ? "bg-blue-default dark:bg-[#1A1B20] text-white"
                    : "text-dark-default hover:text-white hover:bg-blue-default/90 dark:hover:bg-[#1A1B20] dark:text-gray-100",
                )}
              >
                <div className="flex items-center text-sm font-semibold">
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  <span className=" font-medium">{item.label}</span>
                </div>

                {item.subMenu && (
                  <FiChevronDown
                    className={clsx(
                      "transition-transform duration-300 flex items-center",
                      // use current color so it adapts in light/dark/active
                      "text-current",
                      isSubMenuOpen && "rotate-180"
                    )}
                    size={18}
                  />
                )}
              </Link>

              {item.subMenu && (
                <div
                  className={clsx(
                    "overflow-hidden transition-all duration-400 ease-in-out",
                    isSubMenuOpen ? "max-h-[500px] opacity-100 pt-2 pb-2" : "max-h-0 opacity-0 pt-0 pb-0"
                  )}
                >
                  {item.subMenu.map((sub) => (
                    <NavLink
                      to={sub.path}
                      key={sub.path}
                      className={({ isActive }) =>
                        clsx(
                          "flex items-center pl-8 py-2 rounded-lg no-underline capitalize cursor-pointer",
                          // light hover/active
                          "hover:bg-gray-100 text-dark-default",
                          isActive && "text-blue-default font-medium",
                          // dark hover/active
                          "dark:text-gray-100 dark:hover:bg-gray-700",
                          isActive && "dark:text-blue-300"
                        )
                      }
                    >
                      {sub.icon && <span className="mr-2">{sub.icon}</span>}
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
      <div className="xl:px-6 px-3 pt-4 w-full absolute bottom-4">
        <Button onClick={handleLogout} variant="ghost" className="dark:!text-white !text-sm xl:!py-4 !py-3 !rounded-xl hover:!bg-blue-default/90 dark:hover:!bg-[#1A1B20] w-full !gap-0 !font-medium !justify-start hover:!text-white" iconLeft={<AiOutlineLogout size={24} />}>Logout</Button>
      </div>
    </div>
  );
};

export default Sidebar;












































// import React, { useEffect, useState } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import { FiChevronDown } from "react-icons/fi";
// import clsx from "clsx";

// type SubMenu = {
//     label: string;
//     path: string;
//     icon?: React.ReactNode;
// };

// type MenuItem = {
//     label: string;
//     path: string;
//     icon?: React.ReactNode;
//     subMenu?: SubMenu[];
// };

// interface SidebarProps {
//     logo?: React.ReactNode | string;
//     menuItems: MenuItem[];
//     sticky?: boolean;
//     logoClassName?: string;
// }

// const Sidebar: React.FC<SidebarProps> = ({ logo, menuItems, sticky = true, logoClassName = '' }) => {
//     const location = useLocation();
//     const [openMenu, setOpenMenu] = useState<string>("");

//     const toggleMenu = (path: string) => {
//         setOpenMenu((prev) => (prev === path ? "" : path));
//     };

//     const isRouteActive = (item: MenuItem) => {
//         // Check main route
//         if (location.pathname === item.path || location.pathname.startsWith(item.path + "/")) {
//             return true;
//         }

//         // Check submenus
//         if (item.subMenu) {
//             return item.subMenu.some(
//                 (sub) =>
//                     location.pathname === sub.path ||
//                     location.pathname.startsWith(sub.path + "/")
//             );
//         }

//         return false;
//     };


//     useEffect(() => {
//         const matchedMenuItem = menuItems.find((item) => isRouteActive(item));
//         if (matchedMenuItem) {
//             setOpenMenu(matchedMenuItem.path);
//         }
//     }, [location.pathname, menuItems]);

//     return (
//         <aside
//             className={`border-e border-[#1D25301A] bg-white  text-white xl:min-w-[256px] xl:max-w-[256px] min-w-[200px] max-w-[200px] transition-width duration-300 overflow-auto ${sticky ? "sticky top-0" : "relative"
//                 } h-screen self-start z-50 scrollbar-hide`}
//         >


//             <nav className="xl:px-6 px-3 pt-4">
//                 {menuItems.map((item) => {
//                     const isActiveMain = isRouteActive(item);
//                     const isSubMenuOpen = openMenu === item.path;

//                     return (
//                         <div key={item.path}>
//                             <NavLink
//                                 to={item.subMenu ? "#" : item.path}
//                                 onClick={() => item.subMenu && toggleMenu(item.path)}
//                                 className={clsx("!font-normal flex items-center px-4 xl:py-4 py-3 mb-1 cursor-pointer no-underline justify-between capitalize hover:bg-blue-default/90 transition-colors duration-200 rounded-xl hover:text-white", isActiveMain ? "bg-blue-default text-white" : "text-dark-default")}
//                             >
//                                 <div className="flex items-center text-sm font-semibold">
//                                     {item.icon && <span className="mr-2">{item.icon}</span>}
//                                     <span>{item.label}</span>
//                                 </div>

//                                 {item.subMenu && (
//                                     <FiChevronDown
//                                         className={`transition-transform duration-300 text-white flex items-center ${isSubMenuOpen ? "rotate-180" : ""
//                                             }`}
//                                         size={18}
//                                     />
//                                 )}
//                             </NavLink>

//                             {item.subMenu && (
//                                 <div
//                                     className={`overflow-hidden transition-all duration-400 ease-in-out ${isSubMenuOpen
//                                         ? "max-h-[500px] opacity-100 pt-2 pb-2"
//                                         : "max-h-0 opacity-0 pt-0 pb-0"
//                                         }`}
//                                 >
//                                     {item.subMenu.map((sub) => (
//                                         <NavLink
//                                             to={sub.path}
//                                             key={sub.path}
//                                             className={({ isActive }) =>
//                                                 `flex items-center pl-8 py-2 text-white no-underline capitalize cursor-pointer hover:bg-gray-700 ${isActive ? "text-blue-400 font-bold" : ""
//                                                 }`
//                                             }
//                                         >
//                                             {sub.icon && <span className="mr-2">{sub.icon}</span>}
//                                             {sub.label}
//                                         </NavLink>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     );
//                 })}
//             </nav>
//         </aside>
//     );
// };

// export default Sidebar;
