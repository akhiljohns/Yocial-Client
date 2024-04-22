import React from "react";

const FollowBtn = ({ following }) => {
  return (
    <button className="full-rounded relative inline-block bg-white border-none transition-all duration-100 shadow-md hover:bg-blue-500 hover:text-white hover:scale-105">
      {following ? (
        <span className="text-gray-700">Unfollow</span>
      ) : (
        <span className="text-gray-700">Follow</span>
      )}

      <div className="absolute top-1/2 left-1/2 w-36 h-12 transform -translate-x-1/2 -translate-y-1/2 border-full-rounded border-transparent transition-all duration-300 hover:border-white"></div>
    </button>
  );
};

export default FollowBtn;
