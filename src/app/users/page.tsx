"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import HandleDelete from '../Components/HandleDelete';
import HandleEdit from '../Components/HandleEdit';

const AllUsers = () => {
  const [allUser, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOnEdit = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        console.log('Response:', response);
        setAllUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <div className="flex justify-center font-bold m-4 text-4xl bg-purple-500 p-2">
        You have {allUser.length} Staff at your company.
      </div>
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
            {allUser?.map((user: any) => (
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
                  <button
                    onClick={handleOnEdit}
                    className="bg-yellow-500 text-white font-bold m-3 py-2 px-4 rounded hover:bg-yellow-600 transition-colors duration-300"
                  >
                    Edit
                  </button>
                  <HandleEdit isOpen={isModalOpen} closeModal={closeModal} userId={user._id}/>
                  <HandleDelete userId={user._id} />
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
