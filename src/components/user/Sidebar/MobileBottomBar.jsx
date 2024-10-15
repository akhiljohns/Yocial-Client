import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CreatePostModal from "../Post/CreatePostModal"; // Existing modal
import UserListsModal from "../Modals/UserListsModal"; // Existing modal
import { FaHome, FaPlusCircle, FaCommentDots, FaBookmark, FaBell } from "react-icons/fa"; // Importing Font Awesome icons

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
          className="flex flex-col items-center text-orange-500 hover:text-orange-400 transition duration-300"
        >
          <FaHome className="text-2xl" />
          <span className="text-xs">Home</span>
        </button>
        <button
          onClick={openModal}
          className="flex flex-col items-center text-orange-500 hover:text-orange-400 transition duration-300"
        >
          <FaPlusCircle className="text-2xl" />
          <span className="text-xs">Create</span>
        </button>
        <button
          onClick={() => navigate("/chat")}
          className="flex flex-col items-center text-orange-500 hover:text-orange-400 transition duration-300"
        >
          <FaCommentDots className="text-2xl" />
          <span className="text-xs">Chat</span>
        </button>
        <button
          onClick={() => navigate("/savedposts")}
          className="flex flex-col items-center text-orange-500 hover:text-orange-400 transition duration-300"
        >
          <FaBookmark className="text-2xl" />
          <span className="text-xs">Saved</span>
        </button>
        <button
          onClick={toggleModalHandler}
          className="flex flex-col items-center text-orange-500 hover:text-orange-400 transition duration-300"
        >
          <FaBell className="text-2xl" />
          <span className="text-xs">Notify</span>
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
