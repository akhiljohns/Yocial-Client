// SocketHandler.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { BASE_URL } from "../../const/url";

const SocketHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const socket = io.connect(BASE_URL);


    socket.on("videoCall", (roomId) => {
      // Redirect to the video call interface when a call event occurs
      navigate(`/room/${roomId}`);
    });

    return () => {
      socket.disconnect();
    };
  }, [history]);

  return null; // This component doesn't render anything
};

export default SocketHandler;

// useEffect(() => {
//     const socket = io.connect(BASE_URL);
//     socket.emit("newUser", chatRoom?._id, (res) => {});

//     socket.on("newMessage", (data, res) => {});
//   }, [chatRoom]);