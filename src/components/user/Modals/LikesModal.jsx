import React from "react";
import ReactDOM from "react-dom";
import UserList from "./UserList";

const Modal = ({ closeModal, likes }) => {
    // const handleCloseModal = () => {
    //     closeModal(); // Call the function passed from the parent component
    //   };
      
  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-4" style={{ width: "80%", height: "80%" }}>
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div className="px-6 py-4 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 lg:text-xl dark:text-white">
            Likes
          </h3>
        </div>
        <div className="mt-4">
          <UserList closeModal={closeModal} userIds={likes} />
        </div>
      </div>
    </div>,
    document.getElementById("root")
  );
};

export default Modal;
