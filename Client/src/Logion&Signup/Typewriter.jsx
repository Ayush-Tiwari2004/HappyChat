import React, { useEffect, useState } from 'react';

export const Typewriter = () => {
    const messages = [
      "Start chatting instantly 💬",
      "Made for happy conversations 😄",
      "Secure. Fast. Fun. 🔐⚡😎",
    ];
  
    const [text, setText] = useState("");
    const [msgIndex, setMsgIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
  
    useEffect(() => {
      const currentMsg = messages[msgIndex];
      let typeSpeed = isDeleting ? 40 : 80;
  
      const timeout = setTimeout(() => {
        setText((prev) =>
          isDeleting
            ? currentMsg.substring(0, prev.length - 1)
            : currentMsg.substring(0, prev.length + 1)
        );
  
        if (!isDeleting && text === currentMsg) {
          setTimeout(() => setIsDeleting(true), 1000);
        } else if (isDeleting && text === "") {
          setIsDeleting(false);
          setMsgIndex((prev) => (prev + 1) % messages.length);
        }
      }, typeSpeed);
  
      return () => clearTimeout(timeout);
    }, [text, isDeleting, msgIndex]);
  
    return (
      <div className="flex flex-col text-md font-medium text-gray-800 leading-6 w-[400px]">
        <p className='text-gray-400'>Do Happy Chat</p>
         <div className="flex items-center">
         <p className='w-fit me-2'>Hay guys</p>
         <p>{text}</p>
        <span className="animate-pulse text-[blue] text-[24px]">|</span>
         </div>
      </div>
    );
  };