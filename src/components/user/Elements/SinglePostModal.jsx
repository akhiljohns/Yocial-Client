import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa'; // Assuming you're using react-icons library for icons
import { useSelector, useDispatch } from 'react-redux';
import CreatePostModal from '../Post/CreatePostModal';
const SinglePostModal = ({ isOpen, closeModal, imageUrl, caption, setIsCreatePostModalOpen }) => {
  // Check if the modal is open
  if (!isOpen) return null;

  // const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const dispatch = useDispatch();

  const openCreatePostModal = () => {
    setIsCreatePostModalOpen(true);
  };

  const closeCreatePostModal = () => {
    setIsCreatePostModalOpen(false);
  };

  const handleEdit = () => {
    openCreatePostModal();
    closeModal();
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50" onClick={closeModal}>
      <div className="bg-white w-96 p-8 rounded-lg shadow-md flex" onClick={(e) => e.stopPropagation()}>
        {/* Left side - Image */}
        <div className="flex-shrink-0">
          <img src={imageUrl} alt="Modal Image" className="w-40 h-40 object-cover rounded" />
        </div>

        {/* Right side - Comments */}
        <div className="flex-grow ml-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Caption</h2>
            <div>
              <button onClick={handleEdit} className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 transition ease-in-out duration-150">
                <FaEdit />
              </button>
            </div>
          </div>
          <ul className='text-black font-bold font-mono'>
          {caption}
          </ul>
        </div>
          {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 transition ease-in-out duration-150"
        >
          &times;
        </button>
      </div>
      
    </div>
  );
};

export default SinglePostModal;