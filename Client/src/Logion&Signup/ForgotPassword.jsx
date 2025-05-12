import React, { useState } from 'react'
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleformSubmit = async (e) =>{
    e.preventDefault();

    try {
      const url = `${import.meta.env.VITE_BACKEND_API_URL}/api/reset-password`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if(response.ok){
        handleSuccess("OTP sent successfully to your email!")
        setTimeout(() => {
          navigate("/verify-otp")
      }, 1000);
      }
      else {
        handleError("something want wrong")
      }
    }
    catch (error){
      handleError("Failed to send OTP. Try again.", {error})
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Forgot Password</h2>
        <form onSubmit={handleformSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={ email }
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
    </>
  )
}

export default ForgotPassword;
