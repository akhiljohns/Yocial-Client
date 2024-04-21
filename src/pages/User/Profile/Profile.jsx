import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchUserByUsername,
  fetchUserDetails,
} from "../../..//services/User/apiMethods.js";
import Header from "../../../components/user/Header/Header.jsx";
import SinglePostModal from "../../../components/user/Elements/SinglePostModal.jsx";
import {
  setEditPost,
  setUserPosts,
} from "../../../utils/reducers/postReducer.js";
import CreatePostModal from "../../../components/user/Post/CreatePostModal.jsx";
const Profile = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [owner, setOwner] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const { username } = useParams();

  const [imageSrc, setImageSrc] = useState("");
  const [caption, setCaption] = useState("");
  const [postId, setPostId] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const { userData } = useSelector((state) => state?.user);
  const userFollowing = useSelector((state) => state?.user.following);
  const userFollowers = useSelector((state) => state?.user.followers);
  const userposts = useSelector(
    (state) => state?.userPosts?.posts?.posts?.posts
  );

  const handleImage = (post) => {
    dispatch(setEditPost({ editPost: post }));
    setImageSrc(post?.image);
    setCaption(post?.caption);
    setPostId(post?._id);
    openModal();
  };

  useEffect(() => {
    if (username) {
      fetchUserByUsername(username)
        .then((response) => {
          setUser(response);
          if (response._id === userData._id) setOwner(true);
        })
        .catch((error) => setError(error?.message));
    }
  }, [username]);

  useEffect(() => {
    if (user) {
      if (!owner) {
        fetchUserDetails(user?._id)
          .then((response) => {
            // dispatch(setUserPosts(response?.posts));
            setPosts(response?.posts);
            setFollowersCount(response.followers.length);
            setFollowingCount(response.followings.length);
          })
          .catch((error) => setError(error?.message));
      } else {
        setPosts(userposts);
        setFollowersCount(userFollowers.length);
        setFollowingCount(userFollowing.length);
      }
    }
  }, [dispatch, user]);

  const newLocalPost = (newPost) => {
    try {
      // Create a new array with the new post added at the beginning
      const updatedPosts = [newPost, ...posts];
      // Update the state with the new array of posts
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error adding new post:", error);
    }
  };

  const deletePost = (postId) => {
    try {
      // Filter out the post with the specified ID
      const updatedPosts = posts.filter((post) => post._id !== postId);
      // Update the state with the filtered posts
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const updatePostCaption = (postId, newCaption) => {
    try {
      // Find the post with the specified ID
      const postToUpdate = posts.find((post) => post._id === postId);
      if (postToUpdate) {
        // Create a copy of the post object and update its caption
        const updatedPost = { ...postToUpdate, caption: newCaption };
        // Find the index of the post in the array
        const indexToUpdate = posts.findIndex((post) => post._id === postId);
        // Create a new array with the updated post
        const updatedPosts = [
          ...posts.slice(0, indexToUpdate),
          updatedPost,
          ...posts.slice(indexToUpdate + 1),
        ];
        // Update the state with the new array of posts
        setPosts(updatedPosts);
      } else {
        console.log("Post not found");
      }
    } catch (error) {
      console.error("Error updating post caption:", error);
    }
  };

  return (
    <>
      <div className="relative h-full w-full">
        <div className="fixed z-40 top-0">
          <Header choice={"home"} />
        </div>

        <div className="p-5 mt-16 flex flex-col h-full items-center justify-start">
          {/* User Details */}
          <div className="">
            <div className="flex items-center justify-center">
              <img
                src={user?.profilePic}
                alt="User Profile"
                className="rounded-full h-20 w-20 mr-4 img-thumbnail"
              />
              <div className="ms-3">
                <h5 className="text-white">{user?.name}</h5>
                <p className="text-white">{user?.username}</p>
              </div>
            </div>

            {/* User Stats */}
            <div className="mt-6 text-white bg-black p-4 flex">
              <div className="flex gap-3 justify-center items-center py-1">
                <div className="flex flex-col gap-1 items-center">
                  <p className="small text-muted mb-0">Posts</p>
                  <p className="mb-1 h5">{posts?.length || 0}</p>
                </div>
                <div className="flex flex-col gap-1 items-center">
                  <p className="small text-muted mb-0">Followers</p>
                  <p className="mb-1 h5">{followersCount || 0}</p>
                </div>
                <div className="flex flex-col gap-1 items-center">
                  <p className="small text-muted mb-0">Following</p>
                  <p className="mb-1 h5">{followingCount || 0}</p>
                </div>
              </div>
            </div>
          </div>

          {/* User Posts */}
          {posts && (
            <div className="text-white p-4 bg-black">
              <div className="grid grid-cols-4 gap-5">
                {posts.map((post) => (
                  <img
                    key={post?._id}
                    src={post?.image}
                    alt={post?.caption}
                    className="w-full"
                    style={{
                      userSelect: "none",
                      WebkitUserSelect: "none",
                      MozUserSelect: "none",
                      msUserSelect: "none",
                      WebkitUserDrag: "none",
                      userDrag: "none",
                    }} //Disable Image Dragging & Selecting
                    onClick={() => {
                      handleImage(post);
                    }}
                    onContextMenu={(e) => e.preventDefault()} // Disable right-click
                  />
                ))}
              </div>
            </div>
          )}
          {!posts && (
            <div className="bg-black rounded-lg shadow-lg p-5 w-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-white">No posts available.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <SinglePostModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        imageUrl={imageSrc}
        caption={caption}
        postId={postId}
        setIsCreatePostModalOpen={setIsCreatePostModalOpen}
        owner={owner}
        delPost={deletePost}
      />

      {isCreatePostModalOpen && (
        <CreatePostModal
          isModalOpen={isCreatePostModalOpen}
          setIsModalOpen={setIsCreatePostModalOpen}
          type={"editPost"}
          newLocalPost={newLocalPost}
          editPostCaption={updatePostCaption}
        />
      )}
    </>
  );
};

export default Profile;
