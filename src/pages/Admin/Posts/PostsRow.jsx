import React, { useEffect, useState } from "react";
import {
  blockPost,
} from "../../../services/Admin/apiMethods";
import { convertDateTime } from "../../../hooks/timeAgo";
import { errorToast } from "../../../hooks/toast";

function PostsRow({ post, index }) {
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    // console.log("post :>> ", post);
    post.blocked ? setIsBlocked(true) : setIsBlocked(false);
  },[post]);

  const handleBlock = () => {
    setIsBlocked((prevIsBlocked) => !prevIsBlocked);

    blockPost(post._id)
    .then((response) => {
        console.log('post.blocked :>> ', post.blocked);
        console.log('reponse :>> ', response);
      })
      .catch((error) => {
        errorToast(error);
      });
  };

  return (
    <>
      <tr key={index} className="hover:bg-gray-100">
        <td className="px-6 py-4 whitespace-nowrap">
          <img src={post.image} alt="Post" className="h-16 w-16" />
        </td>
        <td className="px-6 py-4 whitespace-nowrap">{post.userId.username}</td>
        <td className="px-6 py-4 whitespace-nowrap">{post.caption}</td>
        <td className="px-6 py-4 whitespace-nowrap">{post.likes.length}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          {post.commentCount.commentCount}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {convertDateTime(post.createdAt)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {!isBlocked ? (
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              onClick={handleBlock}
            >
              BLOCK
            </button>
          ) : (
            <button
            className="bg-green-600 hover:bg-green-400 text-white px-4 py-2 rounded-md"
            onClick={handleBlock}
          >
            UNBLOCK
          </button>
          )}
        </td>
      </tr>
    </>
  );
}

export default PostsRow;
