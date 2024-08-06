"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import HandleDelete from "../Components/HandleDelete";
import HandleEdit from "../Components/HandleEdit";
import toast from "react-hot-toast";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/users?search=${search}`
      );
      setAllUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search]);

  const handleUpdateUser = async (updatedUser) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/users?userId=${updatedUser.id}`,
        updatedUser
      );
      toast.success("Successfully Updated the details!!!");

      fetchUsers(); 
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      toast.success("Successfully Deleted the User!!!");

      fetchUsers(); 
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center font-bold m-4 text-4xl bg-purple-500 p-2">
        You have {allUsers.length} Staff at your company.
      </div>
      <div className="flex items-center justify-center  bg-gray-100">
        <input
          className="border border-red-500 rounded-lg p-4 w-1/3 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
          placeholder="Enter text here..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>{" "}
      <div className="overflow-x-auto max-w-7xl mx-auto py-8">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium uppercase tracking-wider">
                Staff ID
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium uppercase tracking-wider">
                Staff Username
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium uppercase tracking-wider">
                Staff Email
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium uppercase tracking-wider">
                Staff Password
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {allUsers.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-gray-100 transition-colors duration-300"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user._id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.password}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <HandleEdit user={user} onUpdate={handleUpdateUser} />
                  <HandleDelete userId={user._id} onDelete={handleDeleteUser} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllUsers;
