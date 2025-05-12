import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleError, handleSuccess } from '../utils';
import { useNavigate } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa6';
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';
import { Typewriter } from './Typewriter';
import { BiUpArrowAlt } from "react-icons/bi";

export const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;

    if (!username || !email || !password) {
      return handleError('Username, email, or password is required');
    }

    try {
      const url = `${import.meta.env.VITE_BACKEND_API_URL}/api/auth/signup`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      const { success, message, jwtToken, error, user } = result;

      if (success) {
        handleSuccess(message);
        dispatch(setAuthUser(user));
        localStorage.setItem('userIdentityJwtToken', jwtToken);
        localStorage.setItem('loggedInUser', user.username);
        localStorage.setItem('loggedInUserEmail', user.email);
        localStorage.setItem('userId', user._id);
        setTimeout(() => { navigate('/profile'); }, 1000);

      } else if (error) {
        handleError(error);
      }
    }
    catch (err) {
      handleError(err);
    }
  };

  return (
    <>
      <div className="h-[calc(100vh-4.5rem)] flex gap-5 justify-center md:justify-between items-center bg-gray-800 text-white">
        <div className="flex justify-center w-full md:w-[50%]">
          <div className="rounded-lg w-full max-w-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Create Your Account</h2>
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
                <label htmlFor="username" className="block text-md font-medium">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder='Enter your name'
                  className="mt-1 block w-full px-3 py-2 bg-transparent border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-md font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder='Enter your email'
                  className="mt-1 block w-full px-3 py-2 bg-transparent border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-md font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder='Enter your password'
                  className="mt-1 block w-full px-3 py-2 bg-transparent border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-slate-800 bg-white font-semibold py-2 px-4 rounded-md"
              >
                Sign Up
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-400">
              Already have an account?{' '}
              <a href="/login" className="underline text-white hover:text-blue-400">
                Login
              </a>
            </p>
          </div>
        </div>
        <div className="w-[50%] p-2 h-full hidden md:block">
          <div className="flex gap-5 justify-center items-center h-full kalakhattaimage">
            {/* <p className='text-4xl text-gray-800 font-semibold'>Start your Joyful conversations</p> */}
            <div className="flex items-center p-5 bg-white rounded-2xl">
              <Typewriter />
              <div className="bg-gray-700 p-2 rounded-full text-2xl">
              <BiUpArrowAlt />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
