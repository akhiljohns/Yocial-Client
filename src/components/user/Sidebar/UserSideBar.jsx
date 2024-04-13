import React, { useEffect, useState } from "react";
import "./UserSideBar.css";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CropImage from "../Options/CropImg";
import CreatePostModal from "../Post/CreatePostModal";

const UserSideBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.user?.userData);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div
      className="h-screen absolute left-0 top-0 z-10 bg-black user-sidebar"
      style={{ width: "200px" }}
    >
      <div className="flex flex-col h-full justify-center items-center">
        <button
          className="py-2 px-4 my-2 w-40 bg-gray-900 text-white rounded hover:bg-blue-700"
          onClick={openModal}
        >
          Create Post
        </button>
        <button
          onClick={() => {
            navigate(`/editprofile/${userData.username}`);
          }}
          className="py-2 px-4 my-2 w-40 bg-gray-900 text-white rounded hover:bg-blue-700"
        >
          Edit Profile
        </button>
        <button
          onClick={() => {
            navigate(`/savedposts`);
          }}
          className="py-2 px-4 my-2 w-40 bg-gray-900 text-white rounded hover:bg-blue-700"
        >
          Saved Posts
        </button>
        <button
          onClick={() => {
            navigate(`/searchusers`);
          }}
          className="py-2 px-4 my-2 w-40 bg-gray-900 text-white rounded hover:bg-blue-700"
        >
          Search Users
        </button>
      </div>
      {isModalOpen && (
        <CreatePostModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          type={"createPost"}
        />
      )}
    </div>
  );
};

export default UserSideBar;
