import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CreatePostModal from "../Post/CreatePostModal"; // Existing modal
import UserListsModal from "../Modals/UserListsModal"; // Existing modal
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ChatIcon from '@mui/icons-material/Chat';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
const MobileBottomBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.user?.userData);
  const [toggleModal, setToggleModal] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const toggleModalHandler = () => {
    setToggleModal(!toggleModal);
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black text-white shadow-lg z-50">
      <div className="flex justify-around items-center h-16">
        <button
          onClick={() => navigate("/")}
          className="flex flex-col items-center text-white hover:text-orange-500 transition duration-300"
        >
          <HomeIcon className="text-2xl" />
          <span className="text-xs">Home</span>
        </button>
        <button
          onClick={openModal}
          className="flex flex-col items-center text-white hover:text-orange-500 transition duration-300"
        >
          <AddCircleIcon className="text-2xl" />
          <span className="text-xs">Create</span>
        </button>
        <button
          onClick={() => navigate("/chat")}
          className="flex flex-col items-center text-white hover:text-orange-500 transition duration-300"
        >
          <ChatIcon className="text-2xl" />
          <span className="text-xs">Chat</span>
        </button>
        <button
          onClick={() => navigate("/savedposts")}
          className="flex flex-col items-center text-white hover:text-orange-500 transition duration-300"
        >
          <BookmarkIcon className="text-2xl" />
          <span className="text-xs">Saved</span>
        </button>
        <button
          onClick={()=> navigate(`/profile/${userData?.username}`)}
          className="flex flex-col items-center text-white hover:text-orange-500 transition duration-300"
        >
          <AccountCircleIcon className="text-2xl" />
          <span className="text-xs">Profile</span>
        </button>
      </div>

      {toggleModal && (
        <UserListsModal choice={"notification"} toggleModal={toggleModalHandler} />
      )}

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

export default MobileBottomBar;
