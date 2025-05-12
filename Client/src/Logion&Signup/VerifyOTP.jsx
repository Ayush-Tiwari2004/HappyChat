import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';


const VerifyOTP = () => {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `${import.meta.env.VITE_BACKEND_API_URL}/api/verifyOTP`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({ otp })
            });
            if(response.ok){
                handleSuccess("otp verifyed seccessfully.");
                setTimeout(() => {
                    navigate("/set-new-password")
                }, 1000);
            }
            else {
                handleError("otp not verifyed")
            }
        } catch (err) {
            handleError(err.response?.data?.message || 'Invalid OTP');
            setMessage('');
        }
    };

    return (
        <div>
            <h2>Verify OTP</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter OTP"
                    name='otp'
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                />
                <button type="submit">Verify OTP</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default VerifyOTP;