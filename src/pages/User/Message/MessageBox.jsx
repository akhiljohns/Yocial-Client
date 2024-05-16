import React, { useEffect, useState } from "react";
import ChatList from "../../../components/user/chat/ChatList";
import ChatBox from "../../../components/user/chat/ChatBox";
import { useDispatch, useSelector } from "react-redux";
import { setUpChatRoom } from "../../../services/User/apiMethods";
import { io } from "socket.io-client";
import MessageIcn from "../../../components/user/Icons/MessageIcn";
import { useNavigate } from "react-router-dom";
import { setCurrentRoom } from "../../../utils/reducers/userReducer";
import { BASE_URL } from "../../../const/url";
import Header from "../../../components/user/Header/Header";
import UserSideBar from "../../../components/user/Sidebar/UserSideBar";
import CreatePostModal from "../../../components/user/Post/CreatePostModal";
function MessageBox() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [chatRoom, setChatRoom] = useState();
  const user = useSelector((state) => state?.user?.userData);
  const isValid = useSelector((state) => state?.user?.validUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reciever, setReciever] = useState();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (reciever) {
      setUpChatRoom(user?._id, reciever?._id)
        .then((chatRoom) => {
          setChatRoom(chatRoom);
          dispatch(setCurrentRoom(chatRoom));
        })
        .catch((error) => {
          if (error.status === 401) {
            navigate("/login");
          }
          setError(error);
        });
    }
  }, [user, reciever, navigate, dispatch]);

  useEffect(() => {
    const socket = io.connect(BASE_URL);
    socket.emit("newUser", chatRoom?._id, (res) => {});

    socket.on("newMessage", (data, res) => {});
  }, [chatRoom]);

  return (
    <>
      <Header />
      <UserSideBar />
      <div className="fixed w-[88vw] ml-[12vw] mt-[10vh] h-[90vh] hidden p-5 md:flex gap-6">
        <ChatList setReciever={setReciever} />
        {chatRoom && reciever ? (
          <ChatBox
            reciever={reciever}
            chatRoom={chatRoom}
            setChatRoom={setChatRoom}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            messages={messages}
            setMessages={setMessages}
          />
        ) : (
          <div className="w-full h-full flex border-2 border-white rounded-lg flex-col justify-center items-center gap-3">
            <div className="rounded-full w-40 aspect-square border-white border-2 flex justify-center items-center">
              <MessageIcn size={{ width: 70, height: 70 }} />
            </div>
            <span className="text-white font-poppins font-semibold text-4xl capitalize">
              messages
            </span>
          </div>
        )}

      </div>
        {isModalOpen && (
          <CreatePostModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            type={"chatimage"}
            userProfilePic={user?.profilePic}
            imagePreview={false}
            chatRoom={chatRoom}
            messages={messages}
            setMessages={setMessages}
          />
        )}
    </>
  );
}

export default MessageBox;
