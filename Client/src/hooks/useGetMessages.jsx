import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages, setLoading, setError } from '../redux/messageSlice';
// import { BASE_URL } from '../main';

const useGetMessages = () => {
    const {selectedUser} = useSelector(store => store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMessages = async () => {
            const token = localStorage.getItem("userIdentityJwtToken");    
            if (!token || !selectedUser?._id) return;
    
            dispatch(setLoading(true));
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/message/${selectedUser._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // Store the entire response data
                dispatch(setMessages(res.data));
            } catch (error) {
                console.error("Error fetching messages:", error);
                dispatch(setError(error.message));
            } finally {
                dispatch(setLoading(false));
            }
        };
    
        fetchMessages();
    }, [selectedUser?._id, dispatch]);
}

export default useGetMessages;
