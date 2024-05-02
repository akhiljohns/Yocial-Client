import React, { useEffect, useState } from "react";
import { fetchCommentCount } from "../../../services/Admin/apiMethods";

function PostsRow({ post, index }) {

  return (
    <>
      <tr key={index}>
        <td className="px-6 py-4 whitespace-nowrap">
          <img src={post.image} alt="Post" className="h-16 w-16" />
        </td>
        <td className="px-6 py-4 whitespace-nowrap">{post.userId.username}</td>
        <td className="px-6 py-4 whitespace-nowrap">{post.caption}</td>
        <td className="px-6 py-4 whitespace-nowrap">{post.likes.length}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          {post.commentCount.commentCount}
        </td>
      </tr>
    </>
  );
}

export default PostsRow;
