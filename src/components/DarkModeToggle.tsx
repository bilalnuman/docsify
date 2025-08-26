import { useEffect, useState } from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { LuSunMoon } from "react-icons/lu";


export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    }
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleDarkMode}
    >
      {!isDark ? <LuSunMoon className="text-dark-default dark:text-white hover:rotate-90 duration-300" size={25}/> :
        <IoSunnyOutline className="text-dark-default dark:text-white hover:rotate-90 duration-300" size={25} />
      }
    </button>
  );
}
