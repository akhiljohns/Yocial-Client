import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComments,
  likeunlikePost,
  removeSavedPost,
  savePost,
} from "../../../services/User/apiMethods";
import { timeAgo } from "../../../hooks/timeCalculator";
import { editLoadedPost } from "../../../utils/reducers/postReducer";
import { errorToast } from "../../../hooks/toast";
import { updateSavedPosts } from "../../../utils/reducers/userReducer";
import PostModal from "../Comments/PostModal";
import { useNavigate } from "react-router-dom";

const SinglePostCard = ({ post, setLikePost, toggleLikesModal }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.userData);
  const navigate = useNavigate();
  const [commentOpen, setCommentOpen] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (post && post.createdAt) {
      fetchComments(post?._id, "count").then((res) => {
        setCommentCount(res.count);
      });
      setLiked(post?.likes?.includes(user?._id));
      setSaved(user?.savedPosts?.includes(post?._id));
    }
  }, [post, user]);

  const time = useMemo(() => timeAgo(new Date(post?.createdAt)), [post]);

  const likeunlike = () => {
    likeunlikePost(user?._id, post?._id).then((res) => {
      dispatch(editLoadedPost(res.post));
    });
    setLiked(!liked);
  };

  const saveOrRemovePost = () => {
    if (saved) {
      setSaved(false);
      removeSavedPost(user?._id, post?._id)
        .then((res) => {
          dispatch(updateSavedPosts(res?.post?._id));
        })
        .catch((err) => {
          errorToast(err);
        });
    } else {
      setSaved(true);
      savePost(user?._id, post?._id)
        .then((res) => {
          dispatch(updateSavedPosts(res?.post?._id));
        })
        .catch((err) => {
          errorToast(err);
        });
    }
  };

  const showLikes = (likes) => {
    setLikePost(likes);
    toggleLikesModal();
  };
  const seeProfile = (username) => {
    navigate(`/profile/${username}`);
  };
  return (
    <div className="bg-white p-5 rounded-lg shadow-md max-w-md w-full ">
      <div className="flex items-center justify-between mb-4">
        {/* User Info */}

        <div
          onClick={() => seeProfile(post?.userId?.username)}
          className="flex items-center space-x-2"
        >
          <img
            src={post?.userId?.profilePic}
            alt="User Avatar"
            draggable="false"
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-gray-800 font-semibold mt-1">
              {post?.userId?.name}
            </p>
            <p className="text-gray-800 font-light mt-1">
              {post?.userId?.username}
            </p>
            <p className="text-gray-400 text-sm">{time}</p>
          </div>
        </div>
        {/* Three-dot menu */}
        <div className="text-gray-500 cursor-pointer">
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
            ></svg>
          </button>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-gray-800">{post?.caption}</p>
      </div>
      <div className="mb-4">
        <img
          src={post?.image}
          alt="Post Image"
          draggable="false"
          className="w-full aspect-square object-cover rounded-md"
        />
      </div>

      <div className="flex items-center justify-between text-gray-500">
        {/* Like Button */}
        <button
          onClick={likeunlike}
          className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1"
        >
          <svg
            color={liked ? "red" : ""}
            className="w-5 h-5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C6.11 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-4.11 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span>{post?.likes?.length} Likes</span>
        </button>
        {/* Comment Button */}
        <button
          onClick={() => setCommentOpen(true)}
          className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1"
        >
          <svg
            width="22px"
            height="22px"
            viewBox="0 0 24 24"
            className="w-5 h-5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22ZM8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H13.5C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25H8ZM7.25 10.5C7.25 10.0858 7.58579 9.75 8 9.75H16C16.4142 9.75 16.75 10.0858 16.75 10.5C16.75 10.9142 16.4142 11.25 16 11.25H8C7.58579 11.25 7.25 10.9142 7.25 10.5Z"
            />
          </svg>
          <span> {commentCount} Comments</span>
        </button>
        {/* Save Post Button */}
        <svg
          onClick={saveOrRemovePost}
          className="cursor-pointer ml-auto mr-2"
          width={26}
          height={25}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill={saved ? "black " : "grey"}
        >
          <path
            fill={""}
            fillRule="evenodd"
            d="M4 5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v15.138a1.5 1.5 0 0 1-2.244 1.303l-5.26-3.006a1 1 0 0 0-.992 0l-5.26 3.006A1.5 1.5 0 0 1 4 20.138V5zm11 4a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h6z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      {/* POST LIKED USERS */}
      <div onClick={(e) => showLikes(post?.likes)} className="mt-1">
        {post?.likes?.length > 0 ? (
          <span className="pl-2 text-black text-sm font-light select-none">
            {post?.likes?.includes(user?._id)
              ? `You ${
                  post?.likes.length > 1
                    ? `and ${post?.likes?.length - 1} other`
                    : ""
                } liked this post`
              : post?.likes?.length === 1
              ? `One person liked this post`
              : `${post?.likes?.length} people liked this post`}
          </span>
        ) : null}
      </div>
      {/* Comment Modal */}
      {commentOpen && (
        <PostModal
          userId={user._id}
          post={post}
          closeModal={setCommentOpen}
          commentCount={commentCount}
          setCommentCount={setCommentCount}
        />
      )}
    </div>
  );
};

export default SinglePostCard;
