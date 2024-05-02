// Sidebar.js
import React from "react";
import "./AdminSideBar.css";

import { useNavigate } from "react-router-dom";
const AdminSideBar = () => {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen absolute z-10 bg-black user-sidebar"
      style={{ width: "200px" }}
    >
      <div className="flex flex-col h-full justify-center items-center">
        <button
          onClick={() => navigate("/admin/users")}
          className="py-2 px-4 my-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Users
        </button>
        <button
          onClick={() => navigate("/admin/posts")}
          className="py-2 px-4 my-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Posts
        </button>
        {/* <button
          onClick={() => navigate("/admin/")}
          className="py-2 px-4 my-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Posts
        </button> */}
        {/* Add more buttons here */}
      </div>
    </div>
  );
};

export default AdminSideBar;
