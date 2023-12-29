import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchUserByUsername,
  fetchUserPosts,
} from "../../..//services/User/apiMethods.js";

// import EditProfile from "../../components/modal/EditProfile";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  const { validUser, userData } = useSelector((state) => state?.user);

  // const [isEdit, setIsEdit] = useState(false);

  const { username } = useParams();

  useEffect(() => {
    if (!validUser) {
      navigate("/login");
    }
  }, [validUser, userData, navigate]);

  useEffect(() => {
    if (username) {
      fetchUserByUsername(username)
        .then((response) => {
          setUser(response);
        })
        .catch((error) => {
          setError(error?.message);
        });
    }
  }, [username]);

  useEffect(() => {
    if (user) {
      fetchUserPosts(user?._id)
        .then((response) => {
          setPosts(response.posts);
        })
        .catch((error) => {
          setError(error?.message);
        });
    }
  }, [user]);

  return (
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
              <p className="mb-1 h5">253</p>
            </div>
            <div className="px-3">
              <p className="small text-muted mb-0">Followers</p>
              <p className="mb-1 h5">1026</p>
            </div>
            <div>
              <p className="small text-muted mb-0">Following</p>
              <p className="mb-1 h5">478</p>
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
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
