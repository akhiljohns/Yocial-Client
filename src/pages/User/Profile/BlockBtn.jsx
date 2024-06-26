import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  blockUser,
  getAllPosts,
  unblockUser,
} from "../../../services/User/apiMethods";
import { updateReduxUser } from "../../../utils/reducers/userReducer";
import { resetLoadedPosts } from "../../../utils/reducers/postReducer";

function BlockBtn({ user, color, width, height }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state?.user?.userData);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (currentUser) {
      if (currentUser._id !== user?._id) {
        setBlockedUsers(currentUser.blockedUsers || []);
      }
    }
  }, [currentUser]);

  const block = () => {
    blockUser(currentUser?._id, user?._id)
      .then((response) => {
        updateLoadedPosts();
        dispatch(updateReduxUser(response.user));
        setBlockedUsers(response.blockedUsers);
      })
      .catch((error) => {
        setError(error?.message);
      });
  };

  const unblock = () => {
    unblockUser(currentUser?._id, user?._id)
      .then((response) => {
        updateLoadedPosts();
        dispatch(updateReduxUser(response.user));
        setBlockedUsers(response.blockedUsers);
      })
      .catch((error) => {
        setError(error?.message);
      });
  };

  const updateLoadedPosts = () => {
    getAllPosts(1)
      .then((response) => {
        dispatch(resetLoadedPosts(response.posts));
      })
      .catch((error) => {
        console.log("Failed To update Posts", error);
      });
  };
  return (
    <>
      {!blockedUsers.includes(user?._id) ? (
        <button
          className={`w-${width || 36} h-${height || 9} rounded-lg bg-${
            color || "black"
          } font-medium hover:bg-${
            color == "white" ? "red-800" : "red-700"
          } items-center font-extrabold text-sm`}
          onClick={block}
        >
          Block User
        </button>
      ) : (
        <button
          className={`w-${width || 36} h-${height || 9} rounded-lg bg-${
            color || "black"
          } font-medium hover:bg-${
            color !== "white" ? "green-800" : "green-700"
          } items-center font-extrabold text-sm`}
          onClick={unblock}
        >
          Unblock User
        </button>
      )}
    </>
  );
}

export default BlockBtn;
