import React, { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Footer from "../../Components/Footer";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../../redux/userSlice';
import { ShowLastMessageTime } from "./ShowLastMessageTime";
import { UserSearchInput } from "../ChatMessages/UserSearchInput ";
import ContactsListData from "../../API/ContactsListData.json";

export const ContactList = () => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers, authUser } = useSelector(store => store.user);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [lastMessagesMap, setLastMessagesMap] = useState({});

  const selectedUserHandler = (user) => {
    dispatch(setSelectedUser(user));
  };

  const fetchNewUser = async () => {
    try {
      const token = localStorage.getItem("userIdentityJwtToken");
      const url = `${import.meta.env.VITE_BACKEND_API_URL}/api/auth/get-other-users`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.data && Array.isArray(response.data)) {
        setUsers(response.data);
        setFilteredUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      const initialUsers = ContactsListData.map((user) => ({
        ...user,
        username: user.name
      }));
      setUsers(initialUsers);
      setFilteredUsers(initialUsers);
    }
  };

  const fetchLastMessages = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('userIdentityJwtToken');
      if (!token || !authUser?._id) {
        console.error('No auth token or user ID found');
        return;
      }

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/message/last-messages/${userId}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );

      if (response.data && Array.isArray(response.data)) {
        const messageMap = response.data.reduce((acc, msgData) => {
          acc[msgData._id] = msgData;
          return acc;
        }, {});
        setLastMessagesMap(messageMap);
      }
    } catch (error) {
      console.error("Error fetching last messages:", error);
    }
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      const results = users.filter(user =>
        (user.username || user.name).toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.description || "").toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(results);
    } else {
      setFilteredUsers(users);
    }
  };

  useEffect(() => {
    if (authUser?._id) {
      fetchNewUser();
      fetchLastMessages();
    }
  }, [authUser]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchLastMessages();
    }, 100);
    return () => clearInterval(interval);
  }, [authUser]);

  const shortdUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      const timeA = lastMessagesMap[a._id]?.timestamp || 0;
      const timeB = lastMessagesMap[b._id]?.timestamp || 0;
      return new Date(timeB) - new Date(timeA);
    })
  }, [filteredUsers, lastMessagesMap])

  return (
    <section className="w-full md:w-[360px] h-screen flex flex-col justify-between bg-white dark:bg-gray-800 border-x border-zinc-500">
      <div className="flex flex-col h-full">
        <UserSearchInput onSearch={handleSearch} />

        {/* contact list */}
        <div className="flex flex-col flex-grow overflow-y-scroll scrollbar-hide divide-y-[1px] divide-slate-600">
          {shortdUsers.map((user) => {
            const lastMessageData = lastMessagesMap[user._id];
            return (
              <NavLink
                to={`/profile/userschat/${user._id || user.id}`}
                key={user._id}
              >
                <div
                  onClick={() => selectedUserHandler(user)}
                  className={`${selectedUser?._id === user._id ? 'bg-slate-200 dark:bg-slate-700' : 'hover:bg-slate-100 dark:hover:bg-slate-700'} transition-colors duration-200 flex justify-between items-center px-4 py-4 rounded-md cursor-pointer`}
                >
                  <div className="text-gray-800 dark:text-white flex items-center gap-4 flex-grow">
                    <div className="relative">
                      <img
                        src="/dum.jpg"
                        className="w-10 h-10 rounded-full"
                        alt={`${user.username || user.name}'s avatar`}
                      />
                      <span className={onlineUsers.includes(user._id) ? "absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" : ""}></span>
                    </div>
                    <div className="flex-grow">
                      <p className="font-semibold text-slate-700 dark:text-white">{user.username || user.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {lastMessageData?.lastMessage
                          ? lastMessageData.lastMessage.length > 25
                            ? lastMessageData.lastMessage.slice(0, 25) + "..."
                            : lastMessageData.lastMessage
                          : "Start chatting instantly😍"}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0">
                    <ShowLastMessageTime timestamp={lastMessageData?.timestamp} />
                  </div>
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>

      <div className="sticky bottom-0 z-50 w-full md:hidden">
        <Footer />
      </div>
    </section>
  );
};