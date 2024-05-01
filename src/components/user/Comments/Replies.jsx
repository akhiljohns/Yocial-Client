import React from "react";

function Replies({ replies }) {
  return (
    <>
      <div className="ml-8 mt-2">
        {replies.map((reply, index) => (
          <div key={reply._id} className="flex items-center">
            <span className="text-sm font-medium">
              {reply.userId.username}
            </span>
            <span className="text-sm ml-1">{reply.content}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default Replies;
