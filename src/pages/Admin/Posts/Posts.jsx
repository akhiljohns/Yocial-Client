import React, { useEffect, useState } from "react";
import AdminHeader from "../../../components/admin/Header/AdminHeader";
import AdminSideBar from "../../../components/admin/Sidebar/AdminSideBar";
import { fetchPosts } from "../../../services/Admin/apiMethods";
import PostsRow from "./PostsRow";
import { errorToast } from "../../../hooks/toast";

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5); // Number of posts per page
  const [sortBy, setSortBy] = useState(""); // Sorting option
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [totalPages, setTotalPages] = useState(5);
  useEffect(() => {
    fetchPosts(currentPage, perPage, sortBy)
      .then(async (response) => {
        setPosts(response.posts);
        setTotalPages(Math.ceil(response.totalPosts / perPage));
      })
      .catch((error) => {
        errorToast(error);
      });
  }, [currentPage, perPage, sortBy]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const getSortedPosts = () => {
    let sortedPosts = [...posts];

    // Search functionality
    if (searchQuery) {
      const searchTerm = searchQuery.toLowerCase();
      sortedPosts = sortedPosts.filter(
        (post) =>
          post.caption && post.caption.toLowerCase().includes(searchTerm)
      );
    }

    // Sorting functionality
    if (sortBy === "date") {
      sortedPosts.sort((a, b) => (a.date > b.date ? 1 : -1));
    } else if (sortBy === "likes") {
      sortedPosts.sort((a, b) => b.likes?.length - a.likes?.length);
    } else if (sortBy === "comments") {
      sortedPosts.sort(
        (a, b) => b.commentCount.commentCount - a.commentCount.commentCount
      );
    }
  
    return sortedPosts;
  };
    

  return (
    <>
      <AdminHeader />
      <AdminSideBar />
      <div className="flex justify-center h-[100vh] overflow-hidden">
        <div className="w-[87%] ml-[13vw] mt-[4vh] flex flex-col gap-5">
          <h1 className="text-3xl font-semibold mb-4">All Posts</h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="border rounded-md px-2 py-1"
            >
              <option value="">Sort By</option>
              <option value="date">Date</option>
              <option value="likes">Likes</option>
              <option value="comments">Comments</option>
            </select>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="border rounded-md px-2 py-1"
            />
          </div>
          <div className="flex-1 h-[200px] flex flex-col gap-5 relative">
            <div className="bg-white flex-1">
              <table className="w-[100%] divide-y divide-gray-200">
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
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Posted Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getSortedPosts().map((post, index) => (
                    <PostsRow post={post} key={index} />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center items-center w-full bottom-10 px-10">
              <div className="flex gap-5">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Previous
                </button>
                {/* Pagination showing current page and total pages */}
                <div className="text-white text-md font-sans font-bold px-4 py-2">
                  Page {currentPage} of {totalPages}
                </div>
                <button
                  onClick={handleNextPage}
                  disabled={posts.length < 5 ? true : false}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPosts;
