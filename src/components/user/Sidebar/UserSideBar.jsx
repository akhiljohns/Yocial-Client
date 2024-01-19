import React, { useState } from "react";
import "./UserSideBar.css";
import Modal from "react-modal";

const UserSideBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className="h-screen absolute z-10 bg-black user-sidebar"
      style={{ width: "200px" }}
    >
      <div className="flex flex-col h-full justify-center items-center">
        <button
          className="py-2 px-4 my-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={openModal}
        >
          Create Post
        </button>
        <button className="py-2 px-4 my-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Search
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="flex items-center bg-black border-0 rounded-lg shadow-lg transform overflow-hidden sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        overlayClassName="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm transition-opacity"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            color: "#333",
            maxWidth: "800px",
            margin: "0 auto",
            border: "none",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
            borderRadius: "5px",
            overflow: "auto",
          },
        }}
      >
        <button className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 transition ease-in-out duration-150" onClick={closeModal}>
          &times;
        </button>
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Post</h2>
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Add Image:</label>
            <input type="file" id="image" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label htmlFor="caption" className="block text-gray-700 font-bold mb-2">Caption:</label>
            <input type="text" id="caption" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={closeModal}>
            Submit
          </button>
          <br />
          <button className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default UserSideBar;