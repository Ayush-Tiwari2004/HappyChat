import React from 'react';

const ChatBubble = ({ time, isSender }) => {
  return (
    <div className={`w-full flex ${isSender ? 'justify-end pl-4' : 'justify-start pr-4'}`}>
      <div className={`relative max-w-xs md:max-w-sm pb-6 px-3 py-2 rounded-xl text-white text-sm shadow-md
        ${isSender ? 'bg-emerald-800 rounded-tr-none' : 'bg-gray-600 rounded-tl-none'}`}>
        
        {/* Bubble Arrow */}
        <i className={`absolute top-[3px] rotate-45 w-4 h-4 ${isSender ? '-right-2 bg-emerald-800' : '-left-2 bg-gray-600'}`}></i>

        {/* Message */}
        <p>Lorem ipsum dolor sit amet.</p>

        {/* Timestamp */}
        <span className='absolute right-2 bottom-1 text-[10px] text-gray-300'>
          {time}
        </span>
      </div>
    </div>
  );
};

export default ChatBubble;
