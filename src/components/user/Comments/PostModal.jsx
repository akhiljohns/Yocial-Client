import React, { useState } from "react";

const PostModal = ({ post, comments, closeModal }) => {
  const [newComment, setNewComment] = useState("");
  const MAX_COMMENT_LENGTH = 200; // Maximum characters allowed for the comment

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("bg-black")) {
      closeModal(false);
    }
  };

  const handleChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSendComment = () => {
    // Add logic to handle sending the comment
    console.log("New Comment:", newComment);
    // Reset the input box
    setNewComment("");
  };

  return (
    <div
      onClick={handleOverlayClick}
      className={"fixed inset-0 overflow-y-auto"}
    >
      <div className="flex items-center justify-center min-h-screen ">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="fixed bg-cyan-400 p-4 h-96 rounded-lg shadow-md max-w-3xl w-full flex justify-center   items-center">
          {/* <!-- Left side - Image --> */}
          <div className="w-1/2  mr-2">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              alt="Post"
              className="w-full h-full rounded-lg"
            />
          </div>
          {/* <!-- Right side - Comments --> */}
          <div className="w-1/2 ml-2 bg-cyan-500 h-full relative">
            <div className="overflow-auto no-scrollbar h-full pb-12">
              {/* <!-- Sample comments --> */}
            <div className="border-b py-2">
                <h2 className="text-xl font-semibold mb-2">User Name</h2>
                <h2 className="text-sm mb-2">Date</h2>
                <p className="text-gray-700 text-2xl font-semibold">
                  Comment text goes here
                </p>
              </div>
              <div className="border-b py-2">
                <h2 className="text-xl font-semibold mb-2">User Name</h2>
                <h2 className="text-sm mb-2">Date</h2>
                <p className="text-gray-700 text-2xl font-semibold">
                  Comment text goes here
                </p>
              </div>
              <div className="border-b py-2">
                <h2 className="text-xl font-semibold mb-2">User Name</h2>
                <h2 className="text-sm mb-2">Date</h2>
                <p className="text-gray-700 text-2xl font-semibold">
                  Comment text goes here
                </p>
              </div>
              <div className="border-b py-2">
                <h2 className="text-xl font-semibold mb-2">User Name</h2>
                <h2 className="text-sm mb-2">Date</h2>
                <p className="text-gray-700 text-2xl font-semibold">
                  Comment text goes here
                </p>
              </div>
            </div>
            {/* Input box for new comment */}
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gray-100">
              <textarea
                value={newComment}
                onChange={handleChange}
                className="w-full h-auto p-2 border border-gray-300 rounded-md resize-none"
                placeholder="Add a comment..."
                maxLength={MAX_COMMENT_LENGTH}
              ></textarea>
              <div className="flex justify-end mt-2">
                <p className="text-sm text-gray-500">
                  {newComment.length}/{MAX_COMMENT_LENGTH}
                </p>
                <button
                
                  className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
