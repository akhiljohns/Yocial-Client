// components/Modal.jsx
import React from 'react';

const SinglePostModal = ({ isOpen, closeModal, imageUrl, comments }) => {
  // Check if the modal is open
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="bg-white w-96 p-4 rounded-lg shadow-md flex">
        {/* Left side - Image */}
        <div className="flex-shrink-0">
          <img src={imageUrl} alt="Modal Image" className="w-32 h-32 object-cover rounded" />
        </div>

        {/* Right side - Comments */}
        <div className="flex-grow ml-4">
          <h2 className="text-xl font-bold mb-2">Random Comments</h2>
          <ul>
            {comments.map((comment, index) => (
              <li key={index} className="mb-2">
                {comment}
              </li>
            ))}
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
