import React, { useEffect, useRef, useState } from "react";
import "./UserSideBar.css";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CropImage from "../Options/CropImg";
import CreatePostModal from "../Post/CreatePostModal";
import NotificationLg from "../Notification/NotificationLg";

const UserSideBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.user?.userData);

  //notification section
  const [noteToggle, setNoteToggle] = useState(false);
  const noteOpen = useRef();
  const noteClose = useRef();

  useEffect(() => {
    if (noteToggle) {
      noteOpen.current.click();
    } else {
      noteClose.current.click();
    }
  }, [noteToggle]);


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
        <button
          onClick={() => {
            navigate(`/chat`);
          }}
          className="py-2 px-4 my-2 w-40 bg-gray-900 text-white rounded hover:bg-blue-700"
        >
          Chat
        </button>
        <button
          onClick={() => {
            setNoteToggle(true);
          }}
          className="py-2 px-4 my-2 w-40 bg-gray-900 text-white rounded hover:bg-blue-700"
        >
          Notifications
        </button>
        <div id="notificationTab" className="z-50">
          <div className="text-center hidden ">
            <button
              type="button"
              ref={noteOpen}
              data-drawer-target="drawer-left-example"
              data-drawer-show="drawer-left-example"
              data-drawer-placement="left"
              aria-controls="drawer-left-example"
            >
              Notification drawer
            </button>
          </div>

          <div
            id="drawer-left-example"
            className="fixed select-none top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-[#C6C1C1] w-96 dark:bg-gray-800"
            tabIndex="-1"
            aria-labelledby="drawer-left-label"
          >
            <NotificationLg
              noteToggle={noteToggle}
              setNoteToggle={setNoteToggle}
            />
          </div>

          <button
            type="button"
            id="crossBtn"
            ref={noteClose}
            data-drawer-hide="drawer-left-example"
            aria-controls="drawer-left-example"
            className="hidden"
          />
        </div>
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
