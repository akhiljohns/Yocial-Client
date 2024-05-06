import React, { useEffect, useState } from "react";
import { fetchCommentCount } from "../../../services/Admin/apiMethods";
import { convertDateTime } from "../../../hooks/timeAgo";

function ReportsRow({ post, index }) {
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
      </tr>
    </>
  );
}

export default ReportsRow;
