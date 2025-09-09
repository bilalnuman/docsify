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
<<<<<<< HEAD











// import { useEffect, useState, useCallback } from "react";
// import { IoSunnyOutline } from "react-icons/io5";
// import { LuMoon } from "react-icons/lu";

// type Props = { className?: string };

// export default function DarkModeToggle({ className = "" }: Props) {
//   const [mounted, setMounted] = useState(false);
//   const [isDark, setIsDark] = useState(false);

//   // Init from localStorage or system preference
//   useEffect(() => {
//     setMounted(true);
//     const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
//     const saved = localStorage.getItem("theme");
//     const initial = saved ? saved === "dark" : !!prefersDark;
//     setIsDark(initial);
//     document.documentElement.classList.toggle("dark", initial);
//   }, []);

//   // Persist + apply class
//   useEffect(() => {
//     if (!mounted) return;
//     document.documentElement.classList.toggle("dark", isDark);
//     localStorage.setItem("theme", isDark ? "dark" : "light");
//   }, [isDark, mounted]);

//   // Sync across tabs
//   useEffect(() => {
//     const onStorage = (e: StorageEvent) => {
//       if (e.key === "theme") setIsDark(e.newValue === "dark");
//     };
//     window.addEventListener("storage", onStorage);
//     return () => window.removeEventListener("storage", onStorage);
//   }, []);

//   const toggle = useCallback(() => setIsDark((d) => !d), []);

//   if (!mounted) return null; // avoid hydration mismatch

//   return (
//     <button
//       type="button"
//       role="switch"
//       aria-checked={isDark}
//       aria-label={!isDark ? "Switch to light mode" : "Switch to dark mode"}
//       onClick={toggle}
//       onKeyDown={(e) => {
//         if (e.key === "Enter" || e.key === " ") {
//           e.preventDefault();
//           toggle();
//         }
//       }}
//       className={[
//         "relative inline-flex h-[28px] w-[75px] items-center rounded-full transition-colors",
//         "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
//         !isDark ? "bg-blue-600" : "bg-white border border-blue-600/40",
//         className,
//       ].join(" ")}
//     >
//       {/* Moon (left) */}
//       <LuMoon
//         aria-hidden
//         className={[
//           "absolute left-[8px] h-[16px] w-[16px] transition-opacity",
//           !isDark ? "opacity-100 text-white" : "opacity-0",
//         ].join(" ")}
//       />
//       {/* Sun (right) */}
//       <IoSunnyOutline
//         aria-hidden
//         className={[
//           "absolute right-[8px] h-[16px] w-[16px] transition-opacity",
//           !isDark ? "opacity-0" : "opacity-100 text-blue-600",
//         ].join(" ")}
//       />
//       {/* Knob */}
//       <span
//         aria-hidden
//         className={[
//           "absolute top-1/2 -translate-y-1/2 h-[22px] w-[22px] rounded-full shadow transition-transform duration-300",
//           !isDark
//             ? "translate-x-[49px] bg-white ring-1 ring-blue-300"
//             : "translate-x-[4px] bg-blue-600",
//         ].join(" ")}
//       />
//     </button>
//   );
// }
=======
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
