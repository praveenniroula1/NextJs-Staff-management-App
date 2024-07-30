"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const HandleEdit = ({ isOpen, closeModal, userId }: any) => {
  console.log(userId)

  const [userDetails, setUserDetails] = useState({})

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users?userId=${userId}`)
        console.log(response.data)
        setUserDetails(response.data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }
    getUser()
  }, [userId])

  return (
    <div>
      {JSON.stringify(userDetails)}
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-2xl mb-4">{userId}</h2>
            <p className="mb-4">This is the modal content.</p>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Close Modal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HandleEdit;
