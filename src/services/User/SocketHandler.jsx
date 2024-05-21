// SocketHandler.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { BASE_URL } from "../../const/url";
import { useDispatch, useSelector } from "react-redux";
import { infoToast, successToast } from "../../hooks/toast";
import { addNewReduxNotification } from "../../utils/reducers/notificationReducer";
import { fetchNotifications } from "./apiMethods";
import { clearUser } from "./apiCalls";

export const emitSocketEvent = (event, userId, callback) => {
  const socket = io.connect(BASE_URL);
  socket.emit(event, userId, callback);
};

export const emitPostInteraction = (event, data) => {
  const socket = io.connect(BASE_URL);
  socket.emit(event, data);
};

export const emitUserBlock = (event, data) => {
  const socket = io.connect(BASE_URL);
  socket.emit(event, data);
};

const SocketHandler = () => {
  const dispatch = useDispatch();
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

    socket.on("postInteraction", ({ username, message, userId, postOwner }) => {
      if (user?._id === postOwner) {
        fetchNotifications(postOwner).then((response) => {
          dispatch(addNewReduxNotification(response.notifications));
        });
      }
    });
    socket.on("blockUser", ({ userId }) => {
      if (user?._id === userId) {
        clearUser();
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [history]);

  return null;
};

export default SocketHandler;
