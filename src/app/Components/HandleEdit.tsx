"use client"
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const HandleEdit = ({ user, onUpdate }:any) => {
  const [userDetails, setUserDetails] = useState({
    id: user._id,
    username: user.username,
    email: user.email,
    password: user.password,
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setUserDetails({
      id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
    });
  }, [user]);

  const handleOnEdit = () => {
    setIsOpen(true);
  };

  const handleOnChange = (e:any) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e:any) => {
    e.preventDefault();
    try {
      await onUpdate(userDetails); 
      setIsOpen(false); 
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-80">
              <h2 className="text-xl font-bold mb-4">Edit User</h2>
              <form onSubmit={handleOnSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="id"
                    className="block text-sm font-medium text-gray-700"
                  >
                    ID
                  </label>
                  <input
                    disabled
                    value={user._id}
                    type="text"
                    id="id"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                  disabled
                    onChange={handleOnChange}
                    value={userDetails.email}
                    type="email"
                    name="email"
                    id="email"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <input
                    onChange={handleOnChange}
                    value={userDetails.username}
                    name="username"
                    type="text"
                    id="username"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
               
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    onChange={handleOnChange}
                    value={userDetails.password}
                    type="text"
                    id="password"
                    name="password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <button
        onClick={handleOnEdit}
        className="bg-yellow-500 m-1 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600 transition-colors duration-300"
      >
        EDIT
      </button>
    </>
  );
};

export default HandleEdit;
