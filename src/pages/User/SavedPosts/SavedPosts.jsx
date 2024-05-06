import React, { useEffect, useState } from "react";
import Header from "../../../components/user/Header/Header";
import { useSelector } from "react-redux";
import { fetchSavedPosts } from "../../../services/User/apiMethods";
import PostModal from "../../../components/user/Comments/PostModal";

function SavedPosts() {
  const [savedPosts, setSavedPosts] = useState([]);
  const [postOpen, setPostOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentCount, setCommentCount] = useState(0);
  const { userData } = useSelector((state) => state?.user);

  useEffect(() => {
    fetchSavedPosts(userData?._id).then((response) => {
      setSavedPosts(response.posts);
    });
  }, [userData._id]);

  const handlePostOpen = (post) => {
    setSelectedPost(post);
    setPostOpen(true);
  };

  return (
    <>
      <div className="fixed z-40">
        <Header />
      </div>
      <div className="absolute inset-0 flex justify-center items-center">
        {savedPosts.length === 0 ? (
          <p className="text-white">No saved posts</p>
        ) : (
          <div className="bg-black mt-6">
            <div className="grid grid-cols-5 gap-6">
              {savedPosts.map((post) => (
                <img
                  onClick={(e) => handlePostOpen(post)}
                  key={post?._id}
                  src={post?.image}
                  alt={post?.caption}
                  className="w-full"
                />
              ))}
            </div>
          </div>
        )}
      </div>
      {postOpen && (
        <PostModal
          userId={userData?._id}
          post={selectedPost}
          closeModal={setPostOpen}
          commentCount={commentCount}
          setCommentCount={setCommentCount}
        />
      )}
    </>
  );
}

export default SavedPosts;
