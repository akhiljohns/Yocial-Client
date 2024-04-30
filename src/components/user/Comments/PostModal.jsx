import React, { useEffect, useState } from "react";
import { errorToast, successToast } from "../../../hooks/toast";
import {
  addComment,
  deleteComment,
  fetchComments,
} from "../../../services/User/apiMethods";
import { timeAgo } from "../../../hooks/timeCalculator";
import Confirmation from "../Elements/Confirmation";
import SavePostButton from "../Elements/loaders/SavePostButton";
const PostModal = ({
  userId,
  post,
  closeModal,
  commentCount,
  setCommentCount,
}) => {
  const [postComments, setPostComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [delCommentDetails, setDelCommentDetails] = useState(null);

  const MAX_COMMENT_LENGTH = 200; // Maximum characters allowed for the comment

  useEffect(() => {
    fetchComments(post?._id, "comments").then((response) => {
      setPostComments(response);
    });
  }, [post._id]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("bg-black")) {
      closeModal(false);
    }
  };

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
    addComment(userId, post?._id, newComment)
      .then((response) => {
        setPostComments([response, ...postComments]);
        setCommentCount(commentCount + 1);
        setNewComment("");
      })
      .catch((error) => {
        errorToast("Failed to add comment");
      });
  };

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
    setCommentCount(commentCount - 1);
  };

  return (
    <div
      onClick={handleOverlayClick}
      className={"fixed inset-0 overflow-y-auto"}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="fixed bg-gray-300 p-4 rounded-lg shadow-md max-w-3xl self-center justify-center flex flex-col items-center">
          {/* <!-- Left side - Image --> */}
          <div className=" p-6 h-96 rounded-lg shadow-md max-w-3xl w-full justify-center  flex items-center">
            <div className="w-1/2  mr-2">
              <img
                src={post?.image}
                alt={post?.caption}
                className="w-full h-full rounded-lg"
              />
            </div>
            {/* <!-- Right side - Comments --> */}

            <div className="w-1/2 ml-2 rounded bg-gray-200 h-full ">
              <div className="overflow-auto no-scrollbar h-full pb-12 p-3">
                {postComments?.length === 0 ? (
                  <h1 className="text-center text-2xl font-bold">
                    No Comments Yet
                  </h1>
                ) : (
                  postComments.map((comment, index) => (
                    <div
                      className="border-b py-2 flex items-center justify-between"
                      key={index}
                    >
                      <div>
                        <h1 className="text-[80%] inline font-medium opacity-60">
                          {comment?.userId?.username + " : "}
                        </h1>
                        <h1 className="text-[90%] inline font-bold break-words">
                          {comment?.content}
                        </h1>

                        <h2 className="text-[50%] opacity-60">
                          {timeAgo(new Date(comment?.createdAt))}
                        </h2>
                      </div>
                      {/* Delete Icon/Button */}
                      {userId === comment?.userId?._id && (
                        <button
                          onClick={() => {
                            setDelCommentDetails({
                              commentId: comment?._id,
                              userId: comment?.userId?._id,
                            });
                            setShowDeleteConfirmation(true);
                          }}
                          className="text-gray-400 hover:text-red-600 ml-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M13.293 6.293a1 1 0 011.414 1.414L11.414 11l3.293 3.293a1 1 0 01-1.414 1.414L10 12.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 11 5.293 7.707a1 1 0 011.414-1.414L10 9.586l3.293-3.293a1 1 0 011.414 0z"
                            />
                          </svg>
                        </button>
                      )}

                      {showDeleteConfirmation && (
                        <Confirmation
                          visible={showDeleteConfirmation}
                          setVisible={setShowDeleteConfirmation}
                          message="Are you sure you want to delete this comment?"
                          accept={handleDelete}
                        />
                      )}
                    </div>
                  ))
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
    </div>
  );
};

export default PostModal;
