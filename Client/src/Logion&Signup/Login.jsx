import React, { useState } from 'react';
import { handleError, handleSuccess } from '../utils';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';
import { Typewriter } from './Typewriter';
import { FaGithub } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import { BiUpArrowAlt } from 'react-icons/bi';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    
    if (!email || !password) {
      return handleError("Email and password are required!");
    }

    try {
      const API_URL = import.meta.env.VITE_BACKEND_API_URL;
      console.log("backend api url", API_URL);
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      // Destructure properly from result
      const { user, jwtToken } = result;

      // Dispatch complete user data to Redux
      dispatch(setAuthUser(user));

      // Store necessary data in localStorage
      localStorage.setItem("userIdentityJwtToken", jwtToken);
      localStorage.setItem("userId", user._id);
      localStorage.setItem("userEmail", user.email);

      handleSuccess("Login successful");
      navigate("/profile"); // No need for setTimeout

    } catch (error) {
      handleError(error.message || "Something went wrong while logging in");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="h-[calc(100vh-4.5rem)] flex flex-col md:flex-row gap-5 justify-center md:justify-between items-center bg-gray-800 text-white">
    <div className="flex justify-center w-full md:w-[50%]">
      <div className="p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to your account</h2>
        <div className="flex flex-col gap-4 mb-4">
              <div className="flex items-center gap-2 cursor-pointer justify-center bg-slate-700 p-2 rounded-md border-[.01rem] border-gray-500">
                <FaGithub className='text-xl font-semibold' />
                <p>Signup With GitHub</p>
              </div>
              <div className="flex items-center gap-2 cursor-pointer justify-center bg-slate-700 p-2 rounded-md border-[1px] border-gray-500">
                <FcGoogle className='text-xl font-semibold' />
                <p>Signup With Google</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <hr className='w-full border-t-[0.01rem] border-gray-600' />
              OR
              <hr className='w-full border-t-[0.01rem] border-gray-600' />
            </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-md font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter your email'
              className="mt-1 block w-full px-3 py-2 bg-transparent border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-md font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder='enter your password'
              className="mt-1 block w-full px-3 py-2 bg-transparent border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="flex justify-between text-[12px] mb-5">
            <div className="flex gap-2">
              <input type="checkbox" />
              <p>Remember Me</p>
            </div>
            <NavLink to="/forgot-password">
              <p className='text-gray-300 underline hover:text-red-400'>Forgot Password?</p>
            </NavLink>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-white text-slate-800 font-semibold rounded-md">
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <NavLink to="/" className="text-white underline hover:text-blue-400">
            Signup
          </NavLink>
        </p>
      </div>
      <ToastContainer />
    </div>
    <div className="w-[50%] p-2 h-full hidden md:block">
    <div className="flex flex-col gap-5 justify-center items-center h-full kalakhattaimage">
            <p className='text-4xl text-gray-800 font-semibold'>Welcome back to happy chat</p>
            <div className="flex items-center bg-white p-5 rounded-2xl">
              <Typewriter />
              <div className="bg-gray-700 p-2 rounded-full text-2xl">
              <BiUpArrowAlt />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};