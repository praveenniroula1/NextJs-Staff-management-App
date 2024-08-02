"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const UserForm = () => {
  const formData = {
    email: "",
    username: "",
    password: "",
  };
  const [form, setForm] = useState(formData);

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnClick = async (e: any) => {
    e.preventDefault();
   try {
    const response = await axios.post("http://localhost:3000/api/users", form);
    setForm(formData)
   } catch (error:any) {
    console.log(error.message)
   }
  };

  return (
    <div className=" flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Staff Email"
              onChange={handleOnChange}
              name="email"
              value={form.email}
            />
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Staff UserName
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="StaffName"
              onChange={handleOnChange}
              name="username"
              value={form.username}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Create a password for your user"
              onChange={handleOnChange}
              name="password"
              value={form.password}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-lg transform transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              type="button"
              onClick={handleOnClick}
            >
              Add in the system
            </button>
            
          </div>
          <Link href="/users">
      <button className="bg-green-500 m-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transform transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
        Let's see all the Staff in your company
      </button>
    </Link>
        </form>

        <p className="text-center text-gray-500 text-xs">
          &copy;Praveen's work. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default UserForm;