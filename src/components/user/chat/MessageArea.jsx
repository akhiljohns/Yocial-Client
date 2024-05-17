import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import RecieverText from "./RecieverText";
import SenderText from "./SenderText";

function MessageArea({ messages, setMessages, theme, socket, room }) {
  const user = useSelector((state) => state?.user?.userData);

  const chatBoxRef = useRef();

  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    socket.on("recieveMessage", (newMessage, callback) => {
      setMessages((prevMessage) => [...prevMessage, newMessage]);
    });
  }, [socket]);

  return (
    <>
      <div
        className={`bg-no-repeat bg-cover w-full h-[39rem] md:h-[51rem] px-5 py-16 bg-[#000000a8] flex flex-col gap-3 overflow-auto no-scrollbar`}
        ref={chatBoxRef}
      >
        {messages.map((message, index) => {
          return message?.senderId === user?._id ? (
            <RecieverText message={message} key={message?._id} />
          ) : (
            <SenderText message={message} key={message?._id} />
          );
        })}

        {/* {isTyping && (
            <div className="bg-white w-fit p-3 px-4 gap-2 flex max-w-lg rounded-b-lg justify-center items-center rounded-r-lg">
              <div class="w-2 h-2 rounded-full bg-gray-700 animate-bounce"></div>
              <div class="w-2 h-2 rounded-full bg-gray-700 animate-bounce [animation-delay:-.3s]"></div>
              <div class="w-2 h-2 rounded-full bg-gray-700 animate-bounce [animation-delay:-.5s]"></div>
            </div>
          )} */}
      </div>
    </>
  );
}

export default MessageArea;
