import axios from "axios";
import React, { useEffect, useState } from "react";

const HandleDelete = ({ userId }: any) => {
  const [user,setUser]=useState([])
  const deleteUser = async () => {
    await axios.delete(`http://localhost:3000/api/users?userId=${userId}`);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`http://localhost:3000/api/users`);
      setUser(response.data)
    };
    fetchUser();
  }, [userId]);
  return (
    <button
      onClick={deleteUser}
      className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition-colors duration-300"
    >
      Delete
    </button>
  );
};

export default HandleDelete;