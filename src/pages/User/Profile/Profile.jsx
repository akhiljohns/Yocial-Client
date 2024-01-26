import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchUserByUsername,
  fetchUserDetails,
} from "../../..//services/User/apiMethods.js";
import Header from "../../../components/user/Header/Header.jsx";
import SinglePostModal from "../../../components/user/Elements/SinglePostModal.jsx";
import { setEditPost } from "../../../utils/reducers/postReducer.js";
const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const { validUser, userData } = useSelector((state) => state?.user);
  const { username } = useParams();

  const [imageSrc, setImageSrc] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const comments = ["Nice!", "Great photo!", "Love it!"]; // Replace with your comments

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleImage =  (post) => {
    dispatch(setEditPost({editPost:post}));
    setImageSrc(post?.image);
    openModal();
  };

  useEffect(() => {
    if (username) {
      fetchUserByUsername(username)
        .then((response) => setUser(response))
        .catch((error) => setError(error?.message));
    }
  }, [username]);

  useEffect(() => {
    if (user) {
      fetchUserDetails(user?._id)
        .then((response) => {
          setPosts(response.posts);
          setFollowersCount(response.followers.length);
          setFollowingCount(response.followings.length);
        })
        .catch((error) => setError(error?.message));
    }
  }, [user]);

  return (
    <>
      <Header choice={"home"} />
      <div className="gradient-custom-2 bg-black text-white min-h-screen flex items-center justify-center">
        <div className="container mx-auto py-5">
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
          <div className="mt-6 text-white bg-black p-4">
            <div className="flex justify-center items-center py-1">
              <div>
                <p className="small text-muted mb-0">Posts</p>
                <p className="mb-1 h5">{posts.length}</p>
              </div>
              <div className="px-3">
                <p className="small text-muted mb-0">Followers</p>
                <p className="mb-1 h5">{followersCount}</p>
              </div>
              <div>
                <p className="small text-muted mb-0">Following</p>
                <p className="mb-1 h5">{followingCount}</p>
              </div>
            </div>
          </div>

          <div className="text-white p-4 bg-black">
            <div className="grid grid-cols-4 gap-5">
              {posts.map((post) => (
                <img
                  key={post?._id}
                  src={post?.image}
                  alt={post?.caption}
                  className="w-full"
                  onClick={(e) => {
                    handleImage(post);
                  }}
                />
              ))}
              <SinglePostModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                imageUrl={imageSrc}
                comments={comments}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
