import React, { useEffect, useState } from 'react';
import { IoMdMoon } from 'react-icons/io';
import { MdSunny } from "react-icons/md";

export const Darkmode = ({className}) => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    });

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };
    return (
        <>
            <button onClick={toggleTheme} className="theme-toggle-btn px-3 py-[6px] flex items-center rounded-md">
                {theme === 'dark' ? <MdSunny className={className} /> : <IoMdMoon className={className} />}
            </button>
        </>
    )
}