import React, { useEffect, useState } from "react";
import { errorToast, successToast } from "../../../hooks/toast";
import {
  addComment,
  deleteComment,
  fetchAPost,
  fetchComments,
  getUser,
} from "../../../services/User/apiMethods";
import { timeAgo } from "../../../hooks/timeCalculator";
import Confirmation from "../Elements/Confirmation";
import SavePostButton from "../Elements/loaders/SavePostButton";
import Comment from "../Comments/Comment";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const SinglePostView = ({ postId }) => {
  const navigate = useNavigate();
  const [postComments, setPostComments] = useState([]);
  const [post, setPost] = useState();
  const [newComment, setNewComment] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [delCommentDetails, setDelCommentDetails] = useState(null);
  const [postOwner, setPostOwner] = useState({});
  const { validUser, userData } = useSelector((state) => state?.user);

  const MAX_COMMENT_LENGTH = 200; // Maximum characters allowed for the comment

  //fetching the details post post with postId
  useEffect(() => {
    fetchAPost(postId)
      .then((response) => {
        setPost(response.post);
      })
      .catch((error) => {
        navigate("/NotFound");
      });
  }, [postId, navigate]);

  //fetching the comments for a post with postId
  useEffect(() => {
    if (post && postId) {
      fetchComments(postId, "comments")
        .then((response) => {
          setPostComments(response);
        })
        .catch((error) => {});
    }
  }, [post, postId]);

  useEffect(() => {
    if (post) {
      getUser(post?.userId?._id)
        .then((response) => {
          setPostOwner(response[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [post]);

  const [showReply, setShowReply] = useState(false);
  const [replies, setReplies] = useState([]);

  const handleSendComment = () => {
    if (newComment?.length > MAX_COMMENT_LENGTH) {
      errorToast("Comment is too long!");
      return;
    }
    if (newComment?.length === 0) {
      errorToast("Comment cannot be empty!");
      return;
    }
    // Add comment to the list of comments
    addComment(userData._id, post?._id, newComment)
      .then((response) => {
        setPostComments([response, ...postComments]);
        setNewComment("");
      })
      .catch((error) => {
        errorToast("Failed to add comment");
      });
  };

  useEffect(() => {}, [postComments]);

  const handleDelete = () => {
    deleteComment(delCommentDetails.commentId, delCommentDetails.userId)
      .then((response) => {
        removeComment(delCommentDetails.commentId);
        setShowDeleteConfirmation(false);
        successToast("Comment Deleted");
      })
      .catch((error) => {
        errorToast(error.message);
      });
  };

  const removeComment = (commentId) => {
    const newComments = postComments.filter(
      (comment) => comment._id !== commentId
    );
    setPostComments(newComments);
  };

  return (
    <div className={"fixed inset-0 overflow-y-auto"}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="fixed bg-gray-300 p-4 rounded-lg shadow-md max-w-3xl self-center justify-center flex flex-col items-center">
          {/* Left side - Image */}
          <div className="p-6 h-96 rounded-lg shadow-md max-w-3xl w-full justify-center flex items-center">
            <div className="w-1/2 mr-2">
              <img
                src={post?.image}
                alt={post?.caption}
                className="w-full h-full rounded-lg"
              />
            </div>
            {/* Right side - Comments */}
            <div className="w-1/2 ml-2 rounded bg-gray-200 h-full">
              <div className="overflow-auto no-scrollbar h-full pb-12 p-3">
                {postComments?.length === 0 ? (
                  <h1 className="text-center text-2xl font-bold">
                    No Comments Yet
                  </h1>
                ) : (
                  postComments.map(
                    (comment, index) =>
                      // Check if the comment has no parent ID before rendering it
                      comment.parentId == null && (
                        <Comment
                          postId={post._id}
                          comment={comment}
                          userId={userData._id}
                          key={index}
                          setDelCommentDetails={setDelCommentDetails}
                          setShowDeleteConfirmation={setShowDeleteConfirmation}
                        />
                      )
                  )
                )}
              </div>
              <SavePostButton postId={post?._id} />
            </div>
          </div>
          {/* Input box for new comment */}
          <div className="w-full p-4 bg-gray-200 mt-4 rounded-lg shadow-md max-w-3xl">
            <textarea
              value={newComment}
              onChange={(e) => {
                setNewComment(e.target.value);
              }}
              className="w-full h-auto p-2 border border-gray-300 rounded-md resize-none"
              placeholder="Add a comment..."
              maxLength={MAX_COMMENT_LENGTH}
            ></textarea>
            <div className="flex justify-end mt-2">
              <p className="text-sm text-gray-500">
                {newComment.length}/{MAX_COMMENT_LENGTH}
              </p>
              <button
                onClick={handleSendComment}
                className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
      {showDeleteConfirmation && (
        <Confirmation
          visible={showDeleteConfirmation}
          setVisible={setShowDeleteConfirmation}
          message="Are you sure you want to delete this comment?"
          accept={handleDelete}
        />
      )}
    </div>
  );
};

export default SinglePostView;
