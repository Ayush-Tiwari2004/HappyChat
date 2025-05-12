import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleError, handleSuccess } from '../utils';
import { useNavigate } from 'react-router-dom';

const SetNewPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            handleError('Passwords do not match');
            return;
        }
        try {
            const url = `${import.meta.env.VITE_BACKEND_API_URL}/api/change-password`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({ newPassword })
            });
            if (response.ok){
                handleSuccess("Password changed successfully");
                setTimeout(() => {
                    navigate("/login")
                }, 1000);
            }
            else {
                handleError("something going to wrong for change password")
            }
        } catch (err) {
            handleError('Failed to change password', {err});
        }
    };

    return (
        <div>
            <h2>Set New Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Change Password</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default SetNewPassword;