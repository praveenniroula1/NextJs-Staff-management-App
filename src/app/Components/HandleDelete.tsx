import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

const HandleDelete = ({ userId, onDelete }:any) => {
  const deleteUser = async (e:any) => {
    try {
      await axios.delete(`http://localhost:3000/api/users?userId=${userId}`);

      onDelete(); 
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

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
