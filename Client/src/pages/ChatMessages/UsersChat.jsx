import React, { useEffect, useRef, useState } from 'react';
import UserChatHeader from './UserChatHeader';
import useGetMessages from '../../hooks/useGetMessages';
import { useSelector } from 'react-redux';
import UserChatInput from './UserChatInput';
import { useGetRealTimeMessage } from '../../hooks/useGetRealTimeMessage';
import { ShowLastMessageTime } from './ShowLastMessageTime';

const UsersChat = () => {
  const [isTyping, setIsTyping] = useState(false);
  const scroll = useRef(null);
  useGetMessages();
  useGetRealTimeMessage(); 
  const { messages } = useSelector(state => state.message);
  const { authUser } = useSelector(state => state.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({behavior : "smooth"});
  }, [messages]);

  const messageList = messages?.data?.messages || (Array.isArray(messages) ? messages : []);

  return (
    <div className='h-screen flex flex-col justify-between'>
      <UserChatHeader isTyping={isTyping} />

      {/* Chat Messages */}
      <div className="h-full px-6 py-4 overflow-y-scroll scrollbar-hide flex flex-col gap-2 text-gray-800 dark:text-white">
        {messageList.length > 0 ? (
          messageList.map((msg, index) => {
           return <div key={index} className={`${ msg.senderId === authUser?._id ? 'chat-end justify-end' : 'chat-start justify-start'} chat w-full flex`}>
              <div className={`relative chat-bubble text-white p-2 ${msg.senderId === authUser?._id ? 'chat-bubble-default' : 'chat-bubble-error'}`}>
                <p>{msg.message}</p>
                <span className='text-[12px]'>
                  <ShowLastMessageTime timestamp={msg.createdAt || msg.timestamp} />
                </span>
              </div>
            </div>
})
        ) : (
          <div className="text-center text-gray-500">No messages yet</div>
        )}
        <div ref={scroll} />
      </div>

      {/* Input Section */}
      <UserChatInput setIsTyping={setIsTyping} />
    </div>
  );
};

export default UsersChat;
