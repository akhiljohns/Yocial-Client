import React, { useEffect, useRef, useState } from "react";
import Replies from "./Replies";
import { timeAgo } from "../../../hooks/timeCalculator";
import { getReplies, replyToComment } from "../../../services/User/apiMethods";
function Comment({postId,
  comment,
  userId,
  setDelCommentDetails,
  setShowDeleteConfirmation,
}) {
  const [error, setError] = useState();
  const [reply, setReply] = useState(null);
  const [replies, setReplies] = useState([]);
  const replyText = useRef()

  useEffect(() => {
    getReplies(comment?._id)
      .then((replies) => {
        setReplies(replies);
      })
      .catch((error) => {
        setError(error?.message);
      });
  }, [comment]);


  const addReply = () => {

    if(!reply){
      return false;
    }

    const replyData = {
      content: reply,
      userId:userId,
      postId: postId,
      commentId: comment._id
    };

    replyToComment(replyData).then((response)=> {
      setReplies((prev)=> [response, ...prev]);
      setReply(null)
      replyText.current.value = '';
    }).catch((error)=> {
      setError(error?.message)
    })
  }

  return (
    <div
      className="border-b py-2 flex items-start justify-between"
      key={comment._id}
    >
      <div className="w-full">
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
        {/* Reply Button */}
        <button
          onClick={() => {
            // Toggle visibility of reply input box
            const replyInput = document.getElementById(
              `replyInput-${comment._id}`
            );
            if (replyInput) {
              replyInput.classList.toggle("hidden");
            }
          }}
          className="text-gray-400 hover:text-blue-600 ml-2"
        >
          Reply
        </button>
        {/* Reply Input Box */}
        <div id={`replyInput-${comment._id}`} className="hidden mt-2">
          <input
            onChange={(e) => setReply(e.target.value)}
            type="text"
            ref={replyText}
            placeholder="Write a reply..."
            className="border border-gray-300 px-2 py-1 w-full"
          />
          <button 
          onClick={addReply}
          className="bg-blue-500 text-white px-3 py-1 rounded ml-2">
            Post Reply
          </button>
        </div>
        {/* Render Replies */}
        {replies && replies.length >= 1 && <Replies replies={replies} />}
      </div>
      {/* Delete Icon/Button */}
      {userId === comment?.userId?._id && (
        <button
          onClick={() => {
            setDelCommentDetails({
              commentId: comment._id,
              userId: comment.userId._id,
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
    </div>
  );
}

export default Comment;
