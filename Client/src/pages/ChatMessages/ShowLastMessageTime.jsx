import { useEffect, useState } from 'react';

export const ShowLastMessageTime = ({ timestamp }) => {
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    // हर 30 सेकंड में अपडेट (अधिक रियल-टाइम अनुभव के लिए)
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Start chatting instantly😍';
    
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    // अगर 10 second से कम पुराना है
    if (diffInMinutes < 1) return 'Just now';
    // अगर आज का ही मैसेज है
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    // अगर कल का मैसेज है
    if (date.toDateString() === new Date(now - 86400000).toDateString()) {
      return 'Yesterday';
    }
    // उससे पुराने मैसेज के लिए
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return <span>{formatTime(timestamp)}</span>;
};