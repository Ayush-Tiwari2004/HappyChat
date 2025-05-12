import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleError, handleSuccess } from '../utils';

export const CreateUser = ({show, onClose}) => {
  // const [formData, setFormData] = useState({
  //   title: '',
  //   description: '',
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ 
  //     ...formData,
  //     [name]: value,
  //   });
  // };
  // const handleSubmit = async () => {
  //   try{
  //     const url = `${import.meta.env.VITE_BACKEND_API_URL}/api/post/create-post`
  //     const response = await fetch(url, ({
  //     method: "POST",
  //     headers: {
  //      "Content-Type" : "application/json"
  //     },
  //     body: JSON.stringify(formData)
  //   }))
  //   if(response.ok){
  //     handleSuccess("user create successfully!")
  //   }else{
  //     handleError("invalid user", error)
  //   }
  //   }
  //   catch(error) {
  //     handleError("something going to wrong to create user", error);
  //   }
  // }
  // if(!show) return null;

  // return (
  //   // <div className="fixed min-h-screen flex items-center justify-center bg-gray-100">
  //     <div className="fixed right-20 top-16 bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md w-full max-w-md" onClose={onClose}>
  //       <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Login to your account</h2>
  //       <form onSubmit={handleSubmit}>
  //         <div className="mb-4">
  //           <label htmlFor="Name" className="block text-sm font-medium text-gray-700 dark:text-white">Title</label>
  //           <input
  //             type="text"
  //             name="title"
  //             value={formData.title}
  //             onChange={handleChange}
  //             placeholder='Enter username here'
  //             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  //             required
  //           />
  //         </div>
  //         <div className="mb-6">
  //           <label htmlFor="Number" className="block text-sm font-medium text-gray-700 dark:text-white">Description</label>
  //           <input
  //             type="description"
  //             name="description"
  //             placeholder='Enter description here'
  //             value={formData.description}
  //             onChange={handleChange}
  //             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  //             required
  //           />
  //         </div>
  //         <button
  //           className="w-full bg-green-700 text-white py-2 px-4 rounded-md"
  //         >
  //           Save
  //         </button>
  //       </form>
  //     {/* </div> */}
  //     <ToastContainer />
  //   </div>
  // );
};

