import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../../services/User/apiMethods";
import { timeAgo } from "../../../hooks/timeCalculator";
const SinglePostCard = ({ post }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.userData);

  const [owner, setOwner] = useState(false);

  const [likes, setLikes] = useState([]);

  const [postUser, setPostUser] = useState(null);

  const [error, setError] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    setPostUser(post?.userId);
    setLikes(post?.likes.length);
    setTime(timeAgo(new Date(post?.createdAt))); // Ensure post.createdAt is a Date object
  }, [post.createdAt]); 

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full ">
      {/* User Info with Three-Dot Menu */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <img
            src={postUser?.profilePic}
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-gray-800 font-semibold">{postUser?.name}</p>
            <p className="text-gray-500 text-sm">{time}</p>
          </div>
        </div>
        <div className="text-gray-500 cursor-pointer">
          {/* Three-dot menu icon */}
          <button className="hover:bg-gray-50 rounded-full p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="7" r="1" />
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="17" r="1" />
            </svg>
          </button>
        </div>
      </div>
      {/* Message */}
      <div className="mb-4">
        <p className="text-gray-800">
         {post?.caption}
         
        </p>
      </div>
      {/* Image */}
      <div className="mb-4">
        <img
          src={post?.image}
          alt="Post Image"
          className="w-full h-48 object-cover rounded-md"
        />
      </div>
      {/* Like and Comment Section */}
      <div className="flex items-center justify-between text-gray-500">
        <div className="flex items-center space-x-2">
          <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
            <svg
              className="w-5 h-5 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C6.11 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-4.11 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>{likes} Likes</span>
          </button>
        </div>
        <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
          <svg
            width="22px"
            height="22px"
            viewBox="0 0 24 24"
            className="w-5 h-5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22ZM8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H13.5C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25H8ZM7.25 10.5C7.25 10.0858 7.58579 9.75 8 9.75H16C16.4142 9.75 16.75 10.0858 16.75 10.5C16.75 10.9142 16.4142 11.25 16 11.25H8C7.58579 11.25 7.25 10.9142 7.25 10.5Z"
              ></path>
            </g>
          </svg>
          <span>0 Comments</span>
        </button>
      </div>
    </div>
  );
};

export default SinglePostCard;