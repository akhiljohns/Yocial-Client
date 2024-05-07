// SocketHandler.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { BASE_URL } from "../../const/url";
import { useSelector } from "react-redux";

const SocketHandler = () => {
  const user = useSelector((state) => state?.user?.userData);
  const userFollowing = useSelector((state) => state?.user?.following);
  const userFollowers = useSelector((state) => state?.user?.followers);

  const navigate = useNavigate();

  useEffect(() => {
    const socket = io.connect(BASE_URL);

    socket.on("startVideoCall", (senderId, receiverId) => {
      if (user?._id === receiverId) {
        if (
          userFollowers.includes(senderId) &&
          userFollowing.includes(senderId)
        ) {
          navigate(`/room/${senderId}`);
        }
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [history]);

  return null;
};

export default SocketHandler;