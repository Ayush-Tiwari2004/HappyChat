import { useState, useEffect } from "react";
import { IoMdMoon } from "react-icons/io";
import { MdSunny } from "react-icons/md";

const ToggleSwitch = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const checked = theme === "dark";

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <label className="relative inline-block w-[40px] h-[24px] cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={toggleTheme}
        className="hidden"
      />
      <div
        className={`w-full h-full rounded-full transition-all duration-200 ease-[cubic-bezier(0.27,0.2,0.25,1.51)] flex items-center relative ${
          checked ? "bg-[#838383]" : "bg-white"
        }`}
      >
        {/* Effect Line */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-[9px] h-[2.5px] bg-white rounded-sm transition-all ease-in-out duration-200 ${
            checked
              ? "left-[calc(100%-9px-4px)]"
              : "left-[calc(4px+4.5px)]"
          }`}
        ></div>

        {/* Circle */}
        <div
          className={`w-[18px] h-[18px] bg-white rounded-full shadow transition-all duration-200 ease-[cubic-bezier(0.27,0.2,0.25,1.51)] absolute flex items-center justify-center z-10 ${
            checked
              ? "left-[calc(100%-18px-4px)] shadow-[ -1px_1px_2px_rgba(163,163,163,0.45)]"
              : "left-[4px] shadow-[1px_1px_2px_rgba(146,146,146,0.45)]"
          }`}
        >
          {/* Sun & Moon Icons */}
          <MdSunny
            className={`absolute right-0 text-slate-500 transition-transform duration-200 ${
              checked ? "scale-100" : "scale-0"
            }`}
          />
          <IoMdMoon
            className={`absolute right-0 text-slate-500 transition-transform duration-200 ${
              checked ? "scale-0" : "scale-100"
            }`}
          />
        </div>
      </div>
    </label>
  );
};

export default ToggleSwitch;
