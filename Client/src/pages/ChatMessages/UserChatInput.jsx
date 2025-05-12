import React, { useEffect, useState } from 'react'
import { MdOutlinePhotoCamera } from "react-icons/md";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { FaMicrophone } from 'react-icons/fa6';
import { RiSendPlaneFill } from 'react-icons/ri';
import { FaRegSmile } from 'react-icons/fa';
import { setMessages } from '../../redux/messageSlice';

const UserChatInput = ({ setIsTyping }) => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const {selectedUser} = useSelector(store=>store.user);
    const {messages} = useSelector(store =>store.message);

    const handleSubmit = async (e) =>{
      e.preventDefault();
      try{
        const token = localStorage.getItem("userIdentityJwtToken");
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/api/message/send/${selectedUser._id}`, {message}, {
          headers:{
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
          },
          withCredentials : true
        })
        
        // Update messages state with new message
        const updatedMessages = {
          ...messages,
          data: {
            ...messages?.data,
            messages: [...(messages?.data?.messages || []), res?.data?.data]
          }
        };
        dispatch(setMessages(updatedMessages));
        setMessage("");
        setIsTyping(false);
      }
      catch(error) {
        console.log(error);
      }
    }

  return (
    <>
      <form onSubmit={handleSubmit} className="sticky bottom-0 bg-slate-200 dark:bg-slate-800 p-3 flex gap-2">
        <div className="flex items-center w-full bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 border-[1px] border-slate-2 dark:border-slate-600">
          <FaRegSmile className='text-2xl' />
          <input
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setIsTyping(e.target.value.length > 0);
            }}
            placeholder='Type a message'
            className='bg-transparent outline-none w-full px-2'
          />
          <MdOutlinePhotoCamera className="text-2xl" />
        </div>
        <button
        type='submit'
          className='h-11 w-11 grid place-content-center bg-emerald-400 dark:bg-emerald-500 rounded-full text-2xl cursor-pointer'>
          {message.trim() === '' ? <FaMicrophone /> : <RiSendPlaneFill className='mt-1' />}
        </button>
      </form>
    </>
  )
}

export default UserChatInput
