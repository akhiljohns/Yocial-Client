import React from "react";

function LikedStatus({ showLikes, postLikes, userId }) {
  return (
    <>
      <div
        onClick={(e) => showLikes(postLikes)}
        className="mt-1  cursor-pointer"
      >
        {postLikes?.length > 0 ? (
          <span className="pl-2 text-black text-sm font-light select-none">
            {postLikes?.includes(userId)
              ? `You ${
                  postLikes.length > 1
                    ? `and ${postLikes?.length - 1} other`
                    : ""
                } liked this post`
              : postLikes?.length === 1
              ? `One person liked this post`
              : `${postLikes?.length} people liked this post`}
          </span>
        ) : null}
      </div>
    </>
  );
}

export default LikedStatus;
