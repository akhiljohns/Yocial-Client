import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComments,
  likeunlikePost,
  removeSavedPost,
  savePost,
  reportPost,
  saveNewNotif,
} from "../../../services/User/apiMethods";
import { timeAgo } from "../../../hooks/timeCalculator";
import { editLoadedPost } from "../../../utils/reducers/postReducer";
import { errorToast, successToast } from "../../../hooks/toast";
import { updateSavedPosts } from "../../../utils/reducers/userReducer";
import PostModal from "../Comments/PostModal";
import { useNavigate } from "react-router-dom";
import SavePostButton from "../Elements/loaders/SavePostButton";
import ReportIcon from "../Icons/ReportIcon";
import "./style.css";
import { emitPostInteraction } from "../../../services/User/SocketHandler";
import { addNewReduxNotification } from "../../../utils/reducers/notificationReducer";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";
import LikedStatus from "./LikedStatus";
const SinglePostCard = ({ post, setLikePost, toggleLikesModal }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.userData);
  const navigate = useNavigate();
  const [commentOpen, setCommentOpen] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
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
      if (res?.post?.likes.includes(user._id)) {
        saveNewNotif(
          post?.userId._id,
          post?._id,
          user?._id,
          "liked your post",
          user?.username
        ).then((resp) => {
          emitPostInteraction("postInteraction", {
            postOwner: post?.userId._id,
            userId: user?._id,
            username: user.username,
            message: "liked Your post",
          });
        });
      }
    });
    setLiked(!liked);
  };

  const openReportModal = () => {
    setReportModalOpen(true);
  };

  const closeReportModal = () => {
    setReportModalOpen(false);
    setReportReason("");
  };

  const submitReport = () => {
    const trimmedReason = reportReason.trim();

    // Check if the trimmed reason is empty
    if (!trimmedReason) {
      setErrorMessage("Please enter a reason for reporting.");
      return;
    }
    reportPost(
      user?._id,
      user?.username,
      post?._id,
      reportReason,
      post?.image,
      post?.userId?.username
    )
      .then((res) => {
        closeReportModal();
        setErrorMessage(false);
        successToast("Post Report has been Submitted");
      })
      .catch((err) => {
        errorToast(err);
      });
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
          className="flex items-center space-x-2  cursor-pointer"
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
        {/* Dropdown Menu */}
        {/* <div className="dropdown">
          <div className="text-gray-500 cursor-pointer">
            <button className="hover:bg-gray-50 rounded-full p-1">
            </button>
          </div>
          <div className="dropdown-content">
            <button>Action 1</button>
            <button>Action 2</button>
            <button>Action 3</button>
          </div>
        </div> */}
        {/* Three-dot menu */}
        {/* <div className="text-gray-500 cursor-pointer">
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
        </div> */}
        {/* Report Icon */}
        <ReportIcon doFunction={openReportModal} />
      </div>
      {/* Report Modal */}
      {reportModalOpen && (
        <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-lg shadow-md max-w-md w-full ">
            <h2 className="text-lg font-semibold mb-3">Report Post</h2>
            {/* Error Message */}
            {errorMessage && (
              <p className="text-red-500 mb-3">{errorMessage}</p>
            )}
            <textarea
              className="w-full h-24 border rounded-md p-2 mb-3"
              placeholder="Enter reason for reporting..."
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
            ></textarea>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={closeReportModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={submitReport}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="mb-4">
        <p className="text-gray-800">{post?.caption}</p>
      </div>
      <div className="mb-4">
        <img
          src={post?.image}
          alt="Post Image"
          draggable="false"
          className="w-full aspect-square object-cover rounded-md  cursor-pointer"
        />
      </div>

      <div className="flex items-center justify-between text-gray-500">
        {/* Like Button */}
        <LikeButton likeunlike={likeunlike} liked={liked} likeLength={post?.likes?.length} />
        {/* Comment Button */}
        <CommentButton setCommentOpen={setCommentOpen} commentCount={commentCount}/>
        {/* Save Post Button */}
        <SavePostButton postId={post?._id} />
      </div>
      {/* POST LIKED USERS */}
        <LikedStatus showLikes={showLikes} postLikes={post?.likes} userId={user?._id} />

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
