// Sidebar.js
import React from "react";
import "./UserSideBar.css";
const UserSideBar = () => {
  return (
    <div
      className="h-screen absolute z-10 bg-black user-sidebar"
      style={{ width: "200px" }}
    >
      <div className="flex flex-col h-full justify-center items-center">
        <button className="py-2 px-4 my-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Button 1
        </button>
        <button className="py-2 px-4 my-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Button 2
        </button>
        {/* Add more buttons here */}
      </div>
    </div>
  );
};

export default UserSideBar;
