import React from "react";

function Comment() {
  return (
    <div className="w-full md:w-8/12">
      <div className="flex flex-col" id="comment-container">
        <div className="bg-black">
          <div className="flex flex-row items-center">
            <img
              src="dp.jpg"
              width="40"
              className="rounded-circle"
              alt="Profile Pic"
            />
            <div className="flex flex-col justify-start ml-2">
              <span className="font-bold text-red-600">Wonder Woman</span>
              <span className="text-sm text-gray-500">10 minutes ago</span>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-base">Lorem </p>
          </div>
        </div>
        <div className="bg-white">
          <div className="flex flex-row text-sm">
            <div className="px-2 cursor">
              <i className="fa fa-thumbs-o-up"></i>
              <span className="ml-1">Like</span>
            </div>
            <div className="px-2 cursor">
              <i className="fa fa-comment"></i>
              <span className="ml-1">Reply</span>
            </div>
            <div className="px-2 cursor">
              <i className="fa fa-share"></i>
              <span className="ml-1">Share</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
