import React, { useEffect, useState } from "react";
import { getUser } from "../../../services/User/apiMethods";
import { useNavigate } from "react-router-dom";

function ProfileField({ userId, follow, setTitle, closeModal }) {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  useEffect(() => {
    getUser(userId).then((response) => {
      setUser(response.user[0]);
    });
  }, [userId]);

  const seeProfile = () => {
    if (setTitle) {
      setTitle("");
    }
    closeModal();
    navigate(`/profile/${user?.username}`);
  };

  return (
    <>
      {user && (
        <div
          onClick={seeProfile}
          className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
        >
          <img
            className="w-10 h-10 rounded-full"
            src={user?.profilePic}
            alt="Rounded avatar"
          ></img>
          <span className="flex-1 ml-3 whitespace-nowrap">
            {user?.username || user?.name}
          </span>
        </div>
      )}
    </>
  );
}

export default ProfileField;
