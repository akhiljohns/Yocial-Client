import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchUserByUsername,
  fetchUserDetails,
} from "../../..//services/User/apiMethods.js";
import Header from "../../../components/user/Header/Header.jsx";
import SinglePostModal from "../../../components/user/Elements/SinglePostModal.jsx";
import { setEditPost } from "../../../utils/reducers/postReducer.js";
import CreatePostModal from "../../../components/user/Post/CreatePostModal.jsx";
import ConnectionBtn from "../../../components/user/Options/ConnectionBtn.jsx";
import UserListsModal from "../../../components/user/Modals/UserListsModal.jsx";
import UserList from "../../../components/user/Modals/UserList.jsx";
import BlockBtn from "./BlockBtn.jsx";
const Profile = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [owner, setOwner] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [listModal, setListModal] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [listType, setListType] = useState("");
  const { username } = useParams();

  const [imageSrc, setImageSrc] = useState("");
  const [caption, setCaption] = useState("");
  const [postId, setPostId] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [userBlocked, setUserBlocked] = useState(null);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const { userData } = useSelector((state) => state?.user);

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
          setUser(response.user);
          if (response?.user?._id === userData._id) {
            setOwner(true);
          }
        })
        .catch((error) => setError(error?.message));
    }
  }, [username]);

  useEffect(() => {
    if (user) {
      fetchUserDetails(user?._id)
        .then((response) => {
          setPosts(response?.posts);
          setFollowers(response.followers);
          setFollowing(response.followings);
        })
        .catch((error) => setError(error?.message));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (userData?.blockedUsers?.includes(user?._id)) {
      setUserBlocked(true);
    } else {
      setUserBlocked(false);
    }
  }, [userData, user]);

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
      const postToUpdate = posts.find((post) => post._id === postId);
      if (postToUpdate) {
        const updatedPost = { ...postToUpdate, caption: newCaption };
        const indexToUpdate = posts.findIndex((post) => post._id === postId);
        const updatedPosts = [
          ...posts.slice(0, indexToUpdate),
          updatedPost,
          ...posts.slice(indexToUpdate + 1),
        ];
        setPosts(updatedPosts);
      } else {
        console.log("Post not found");
      }
    } catch (error) {
      console.error("Error updating post caption:", error);
    }
  };
  const openListsModal = (type) => {
    if (userBlocked) {
      return false;
    }
    if (type === "followers") {
      if (followers.length == []) {
        return;
      }
      setUsersList(followers);
      setListType("Followers");
      setListModal(true);
    } else if (type === "following") {
      if (following.length == []) {
        return;
      }
      setUsersList(following);
      setListType("Following");
      setListModal(true);
    }
  };

  const toggleConnectionModal = () => {
    setListModal(!listModal);
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
                src={
                  !userBlocked
                    ? user?.profilePic
                    : "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                }
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
                  <p className="mb-1 h5">
                    {!userBlocked ? posts?.length || 0 : 0}
                  </p>
                </div>
                <div
                  onClick={() => openListsModal("followers")}
                  className="flex flex-col gap-1 items-center cursor-pointer"
                >
                  <p className="small text-muted mb-0">Followers</p>
                  <p className="mb-1 h5">
                    {!userBlocked ? followers.length || 0 : 0}
                  </p>
                </div>
                <div
                  onClick={() => openListsModal("following")}
                  className="flex flex-col gap-1 items-center cursor-pointer"
                >
                  <p className="small text-muted mb-0">Following</p>
                  <p className="mb-1 h5">
                    {!userBlocked ? following.length || 0 : 0}
                  </p>
                </div>
              </div>
            </div>
            {!owner && (
              <div className="flex flex-col items-center justify-center mt-2">
                <ConnectionBtn
                  color={"white"}
                  user={user}
                  setFollowers={setFollowers}
                />
                <div className="flex gap-3 mt-2">
                  <BlockBtn user={user} color={"white"} />
                </div>
              </div>
            )}
          </div>

          {/* User Posts */}
          {!userBlocked && (
            <div className="text-white p-4 bg-black">
              <div className="grid grid-cols-4 gap-5">
                {posts.map((post) => (
                  <img
                    key={post?._id}
                    src={post?.image}
                    alt={post?.caption}
                    className="w-full cursor-pointer"
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

          {userBlocked && (
            <div className="bg-black rounded-lg shadow-lg mt-12 p-5 w-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-red-600 font-extrabold text-3xl">
                  This User Is Blocked
                </p>
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

      {listModal && (
        <UserListsModal
          type={listType}
          userIds={usersList}
          toggleModal={toggleConnectionModal}
          choice={"profile"}
        />
      )}
    </>
  );
};

export default Profile;
