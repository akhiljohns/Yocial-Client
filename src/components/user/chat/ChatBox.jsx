import React, { useEffect, useState } from "react";
import ProfilePic from "../profiles/ProfilePic";
import { useSelector } from "react-redux";
import NameField from "../profiles/NameField";
import TypeBox from "./TypeBox";
import Info from "../Icons/Info";
import { getMessages } from "../../../services/User/apiMethods";

import { io } from "socket.io-client";
import MessageArea from "./MessageArea";
import { BASE_URL } from "../../../const/url";
import { useNavigate } from "react-router-dom";

function ChatBox({
  reciever,
  chatRoom,
  setChatRoom,
  setIsModalOpen,
  isModalOpen,
  messages,
  setMessages
}) {
  const user = useSelector((state) => state?.user?.userData);
  const chatImage = useSelector((state) => state?.user?.chatImage);
  
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [theme, setTheme] = useState("");

  const socket = io.connect(BASE_URL);
  useEffect(() => {
    socket.emit("newUser", chatRoom?._id);

    return () => socket.disconnect();
  });

  useEffect(() => {
    try {
      if (reciever && chatRoom) {
        getMessages(chatRoom?._id)
          .then((messages) => {
            setMessages(messages);
          })
          .catch((err) => {
            throw new Error(err);
          });
      }
    } catch (error) {
      setError(error?.message);
    }
  }, [chatRoom, reciever,chatImage]); 

  useEffect(() => {
    setTheme(
      "https://res.cloudinary.com/di9yf5j0d/image/upload/v1697622170/Relink_chat_themes/WallpaperDog-20525697_wbnnal.jpg"
    );
  }, []);

  const handleVideoCall = () => {
    socket.emit("videoCall", user?._id, reciever?._id); // Emitting the socket event
    navigate(`/room/${user?._id} `);

    // Redirect to the video call interface when a call event occurs
  };

  return (
    <>
      <div className="w-full h-[47rem] opacity-90 md:h-full rounded-lg relative flex flex-col md:border-white md:border-2">
        <div className="flex bg-black w-full h-16 rounded-t-lg items-center px-5 gap-5">
          <ProfilePic
            image={reciever?.profilePic}
            styleProp={"w-12 h-12 rounded-full"}
          />
          <NameField
            name={reciever?.name || user?.username}
            styleProp={"text-white font-poppins font-semi-bold"}
          />
          <div onClick={handleVideoCall} className="ml-auto">
            <Info size={{ width: 26, height: 26 }} color={"#fff"} />
          </div>
        </div>

        {/* chat box area */}
        {messages?.length > 0 ? (
          <MessageArea
            messages={messages}
            setMessages={setMessages}
            theme={theme}
            socket={socket}
            room={chatRoom}
          />
        ) : (
          <div className="bg-black bg-opacity-50 w-full h-full"></div>
        )}

        <div className="w-full flex rounded-b-lg h-16 bg-black opacity-70 absolute bottom-0 items-center px-3 md:px-10">
          <TypeBox
            chatRoom={chatRoom}
            recieverId={reciever?._id}
            messages={messages}
            setMessages={setMessages}
            socket={socket}
            setChatRoom={setChatRoom}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
          />
        </div>
      </div>


      
    </>
  );
}

export default ChatBox;
