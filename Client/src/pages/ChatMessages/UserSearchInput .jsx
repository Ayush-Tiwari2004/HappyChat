import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

export const UserSearchInput = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="sticky top-0 bg-gray-700 z-40 py-3 px-4 bg-white dark:bg-gray-800 shadow-md">
      <div className="flex items-center bg-white dark:bg-gray-700 shadow-lg rounded-lg w-full max-w-md">
        <input
          type="text"
          className="bg-transparent outline-none text-black dark:text-white px-3 w-full placeholder-gray-400"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={handleChange}
        />
        <button className="bg-blue-600 p-2 rounded-md text-xl flex items-center justify-center">
          <IoSearch className="text-white" />
        </button>
      </div>
    </div>
  );
};