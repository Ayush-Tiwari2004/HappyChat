import { useState } from "react";
import { FaArrowLeft, FaChevronRight } from "react-icons/fa6";
import { IoDownloadOutline } from "react-icons/io5";
import { MdOutlineModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiLogOut } from "react-icons/fi";
import { setAuthUser } from "../redux/userSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import ToggleSwitch from "./ToggleSwitch";
import { useRef } from "react";

export const ProfilePopup = ({ show, onClose }) => {
    if (!show) return null;
    const { authUser } = useSelector(state => state.user);
    const [showUsersProfileData, setShowUsersProfileData] = useState(false);
    const [isLightMode, setIsLightMode] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const handleLogout = () => {
        localStorage.clear();
        const logoutSuccess = dispatch(setAuthUser(null));
        if (logoutSuccess) {
            handleSuccess("user logdout successfully!");
            setTimeout(() => {
                navigate('/login');
            }, 500);
        } else {
            handleError("Something going to wrong to user login!");
        }
    }
     const handleImageClick = () => {
        inputRef.current.click();
    }
    const handlePicChange = (e) => {
        const files = e.target.files[0];
        if(!files){
            console.log("no file selected!");
            return
        }
    }
    return (
        <>
            <div className="fixed inset-0 z-50">
                <div className="fixed inset-0 -z-10 bg-black opacity-50" onClick={onClose}></div>
                <div className="md:absolute md:bottom-0 md:left-0 flex h-full md:h-[600px] divide-x-[1px] divide-slate-700">
                    <div className="w-[400px]">
                        <div className="h-full w-screen md:w-full text-gray-700 dark:text-white bg-white dark:bg-slate-800 flex flex-col gap-2 p-5">
                            <div onClick={onClose}><FaArrowLeft /></div>
                            <div className="flex flex-col items-center gap-2">
                                <div onClick={handleImageClick} className="relative">
                                <img  src="/dum.jpg" className='w-24 h-24 rounded-full' alt="" />
                                <input 
                                type="file"
                                onChange={handlePicChange}
                                ref={inputRef}
                                className="hidden"
                                 />
                                </div>
                                <p className='leading-3 text-xl font-semibold'>{authUser.username}</p>
                                <p>CEO & Founder at Crefcard </p>
                            </div>
                            <div className="flex flex-col gap-2 overflow-y-scroll scrollbar-hide">
                                <details className="bg-slate-200 dark:bg-slate-700 text-gray-700 dark:text-white rounded-lg group">
                                    <summary className="flex justify-between items-center cursor-pointer">
                                        <div onClick={() => setShowUsersProfileData(!showUsersProfileData)} className="flex justify-between items-center bg-slate-200 dark:bg-slate-700 text-gray-700 dark:text-white p-3 rounded-md cursor-pointer w-full">
                                            <p>Information</p>
                                            <FaChevronRight />
                                        </div>
                                    </summary>
                                    <div className={`md:hidden transition-all duration-200 ease-in-out pb-5 ${showUsersProfileData ? "block w-full" : "opacity-0 w-0"}`}>
                                        <div className={`bg-white h-full dark:bg-slate-700 text-gray-700 dark:text-white overflow-hidden`}>
                                            <form>
                                                <div className="flex flex-col gap-4 mt-5">
                                                    <div className="bg-[#e2e8f0] dark:bg-slate-600 p-2 rounded-md">
                                                        <label htmlFor="">Username</label>
                                                        <div className="flex items-center justify-between bg-white dark:bg-slate-700 py-2 px-4 rounded-lg border-[1px] border-slate-200 dark:border-slate-800 focus-within:border-blue-500">
                                                            <input type="text" className="w-full bg-transparent outline-none placeholder:text-gray-800 dark:placeholder:text-white" placeholder={authUser.username} />
                                                            <MdOutlineModeEdit className="cursor-pointer" />
                                                        </div>
                                                    </div>

                                                    <div className="bg-[#e2e8f0] dark:bg-slate-600 p-2 rounded-md">
                                                        <label htmlFor="">Email</label>
                                                        <div className="flex items-center justify-between bg-white dark:bg-slate-700 py-2 px-4 rounded-lg border-[1px] border-slate-200 dark:border-slate-800 focus-within:border-blue-500">
                                                            <input type="text" className="w-full bg-transparent outline-none placeholder:text-gray-800 dark:placeholder:text-white" placeholder={authUser.email} />
                                                            <MdOutlineModeEdit className="cursor-pointer" />
                                                        </div>
                                                    </div>
                                                    <div className="bg-[#e2e8f0] dark:bg-slate-600 p-2 rounded-md">
                                                        <label htmlFor="">Contact No.</label>
                                                        <div className="flex items-center justify-between bg-white dark:bg-slate-700 py-2 px-4 rounded-lg border-[1px] border-slate-200 dark:border-slate-800">
                                                            <p type="text" className="text-gray-800 dark:text-white">6394332714</p>
                                                        </div>
                                                    </div>
                                                    <div className="bg-[#e2e8f0] dark:bg-slate-600 p-2 rounded-md">
                                                        <label htmlFor="">Date of birth</label>
                                                        <div className="flex items-center justify-between bg-white dark:bg-slate-700 py-2 px-4 rounded-lg border-[1px] border-slate-200 dark:border-slate-800">
                                                            <p type="text" className="text-gray-800 dark:text-white">10/08/2005</p>
                                                        </div>
                                                    </div>

                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </details>

                                <div className="flex justify-between items-center bg-slate-200 dark:bg-slate-700 text-gray-700 dark:text-white p-3 rounded-md">
                                    <p>Image <span className="text-[14px]">(15)</span></p>
                                    <FaChevronRight />
                                </div>
                                <div onClick={handleLogout} className="flex justify-between items-center bg-slate-200 dark:bg-slate-700 text-gray-700 dark:text-white p-3 rounded-md cursor-pointer">
                                    <p className='text-sm leading-tight pt-1'>Logout</p>
                                    <FiLogOut className='text-lg' />
                                </div>
                                <details className="bg-slate-200 dark:bg-slate-700 text-gray-700 dark:text-white rounded-lg group">
                                    <summary className="flex justify-between items-center p-3 cursor-pointer">
                                        <p>Files</p>
                                        <FaChevronRight className="transform transition-transform duration-300 group-open:rotate-90" />
                                    </summary>
                                    <div className="overflow-y-scroll scrollbar-hide transition-all duration-300 ease-in-out max-h-0 group-open:max-h-[250px] rounded-md m-2 divide-y-[1px] divide-slate-300 dark:divide-slate-500">
                                        <div className="p-3 bg-white dark:bg-slate-600">
                                            <div className="flex items-center gap-3">
                                                <IoDownloadOutline className="text-green-400 text-xl" />
                                                <p className="">Fleshcard creation tool(Final project).</p>
                                            </div>
                                        </div>
                                    </div>
                                </details>
                                <div className="flex justify-between items-center bg-slate-200 dark:bg-slate-700 text-gray-700 dark:text-white p-3 rounded-md cursor-pointer">
                                    <p className='text-sm leading-tight pt-1'>{isLightMode ? "Light Mode" : "Dark Mode"}</p>
                                    <ToggleSwitch checked={isLightMode} onToggle={() => setIsLightMode(!isLightMode)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`hidden md:block transition-all duration-200 ease-in-out ${showUsersProfileData ? "block w-[400px]" : "opacity-0 w-0"}`}>
                        <div className={`bg-white h-full dark:bg-slate-800 text-gray-700 dark:text-white overflow-hidden px-4 pt-5`}>
                            <h1 className="text-xl">Account Details</h1>
                            <form>
                                <div className="flex flex-col gap-4 mt-5">
                                    <div>
                                        <label htmlFor="">Username</label>
                                        <div className="flex items-center justify-between bg-slate-200 dark:bg-slate-700 py-2 px-4 rounded-lg border-[1px] border-slate-200 dark:border-slate-600 focus-within:border-blue-500">
                                            <input type="text" className="w-full bg-transparent outline-none placeholder:text-gray-800 dark:placeholder:text-white" placeholder={authUser.username} />
                                            <MdOutlineModeEdit className="cursor-pointer" />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="">Email</label>
                                        <div className="flex items-center justify-between bg-slate-200 dark:bg-slate-700 py-2 px-4 rounded-lg border-[1px] border-slate-200 dark:border-slate-600 focus-within:border-blue-500">
                                            <input type="text" className="w-full bg-transparent outline-none placeholder:text-gray-800 dark:placeholder:text-white" placeholder={authUser.email} />
                                            <MdOutlineModeEdit className="cursor-pointer" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="">Contact No.</label>
                                        <div className="flex items-center justify-between bg-slate-200 dark:bg-slate-700 py-2 px-4 rounded-lg border-[1px] border-slate-200 dark:border-slate-600">
                                            <p type="text" className="text-gray-800 dark:text-white">6394332714</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="">Date of birth</label>
                                        <div className="flex items-center justify-between bg-slate-200 dark:bg-slate-700 py-2 px-4 rounded-lg border-[1px] border-slate-200 dark:border-slate-600">
                                            <p type="text" className="text-gray-800 dark:text-white">10/08/2005</p>
                                        </div>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}