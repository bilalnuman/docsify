import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import clsx from "clsx";
import Button from "@/components/Button";
import { AiOutlineLogout } from "react-icons/ai";
import { clearCookiesAndStorage } from "@/helpers/logoutUser";
import { useAppContext } from "@/context/AppContext";
import { useTranslation } from "react-i18next";


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
  const { authUser } = useAppContext()
  const { t } = useTranslation();

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
    clearCookiesAndStorage()
    // @ts-ignore
    authUser(null)
    navigate("/login", { replace: true });
  };


  useEffect(() => {
    const matchedMenuItem = menuItems.find((item) => isRouteActive(item));
    if (matchedMenuItem) setOpenMenu(matchedMenuItem.path);
  }, [location.pathname, menuItems]);

  return (
    <>
      <div className="relative  ">

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

                            "hover:bg-gray-100 text-dark-default",
                            isActive && "text-blue-default font-medium",

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
      </div>
      <div className="xl:px-6 px-3 pt-4 w-full">
        <Button onClick={handleLogout} variant="ghost" className="dark:!text-white !text-sm xl:!py-4 !py-3 !rounded-xl hover:!bg-blue-default/90 dark:hover:!bg-[#1A1B20] w-full !gap-0 !font-medium !justify-start hover:!text-white capitalize" iconLeft={<AiOutlineLogout size={24} />}>{t("logout")}</Button>
      </div>
    </>
  );
};

export default Sidebar;
