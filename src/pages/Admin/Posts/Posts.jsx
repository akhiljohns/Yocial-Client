import React, { useEffect, useState } from "react";
import AdminHeader from "../../../components/admin/Header/AdminHeader";
import AdminSideBar from "../../../components/admin/Sidebar/AdminSideBar";
import { fetchPosts } from "../../../services/Admin/apiMethods";

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10); // Number of posts per page

  useEffect(() => {
    console.log('hi :>> ',);
    fetchPosts(currentPage, perPage) // Fetch posts with pagination parameters
      .then((response) => {
        setPosts(response.posts);
      })
      .catch((error) => {
        errorToast(error);
      });
  }, [currentPage, perPage]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
      {" "}
      <AdminHeader />
      <AdminSideBar />
      <div className="flex">
        <div className="flex-grow">
          <h1 className="text-3xl font-semibold mb-4">All Posts</h1>
          <div className="overflow-x-auto]">
            <table className="mt-[4.9vh] ml-[13vw] w-[87vw] divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Post Image
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Post Owner
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Post Caption
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Like Count
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Comment Count
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {posts.map((post,index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img src={post.image} alt="Post" className="h-16 w-16" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {post.userId.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {post.caption}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {post.likes.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {post.blocked}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevPage}
              className="bg-blue-500 text-white px-4 py-2 ml-[13.5%] rounded-md mr-2"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              className="bg-blue-500 text-white px-4 mr-[1%] py-2 rounded-md"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPosts;
