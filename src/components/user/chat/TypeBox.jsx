import React, { useEffect, useRef, useState } from "react";
import SendIcn from "../Icons/SendIcn";
import { sendMessage } from "../../../services/User/apiMethods";
import { useDispatch, useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import { initFlowbite } from "flowbite";
import {
  updateCurrentRoom,
  updateReduxChatRoom,
} from "../../../utils/reducers/userReducer";
import EmojiIcn from "../Icons/EmojiIcn";
import TypeBoxSVG from "./TypeBoxSVG";
function TypeBox({
  chatRoom,
  setMessages,
  messages,
  recieverId,
  socket,
  setChatRoom,
}) {
  const emojiRef = useRef();
  const emojiIcnRef = useRef();
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    initFlowbite();
  });

  const textRef = useRef();
  const [text, setText] = useState("");

  const user = useSelector((state) => state?.user?.userData);

  const sendNewMessage = () => {
    if (!text) {
      return;
    }

    try {
      sendMessage(chatRoom?._id, text, user?._id)
        .then((response) => {
          setMessages([...messages, response]);

          socket.emit(
            "sendMessage",
            chatRoom?._id,
            response,
            user?._id,
            (res) => {}
          );

          dispatch(updateReduxChatRoom(recieverId)); // updating chat rooms in redux
          dispatch(updateCurrentRoom(response)); // updating current chat room in redux
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setText("");
          textRef.current.value = "";
        });
    } catch (error) {
      setError(error);
    }
  };

  const setEmoji = (emojiData) => {
    setText((prev) => prev + emojiData?.emoji);
    textRef.current.value += emojiData.emoji;
  };

  //Emoji management
  const toggleEmoji = () => {
    emojiRef.current.hidden = !emojiRef.current.hidden;
  };
  const handleDocumentClick = (event) => {
    if (
      emojiRef.current &&
      !emojiRef.current.contains(event.target) &&
      emojiIcnRef.current &&
      !emojiIcnRef.current.contains(event.target)
    ) {
      // Click occurred outside the emoji picker and emoji icon, so hide it
      emojiRef.current.hidden = true;
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendNewMessage();
    }
  };
  return (
    <>
      <div
        className="absolute bottom-16 left-2 w-fit h-fit bg-white z-10 rounded-lg"
        hidden
        ref={emojiRef}
      >
        <EmojiPicker emojiStyle="telegram" onEmojiClick={setEmoji} />
      </div>
      <div className="w-full p-2 bg-transparent h-12 rounded-full ml- mr-auto flex items-center gap-3 border-2 border-white">
        <button
          ref={emojiIcnRef}
          onClick={toggleEmoji}
          className="emojiBtn bg-white rounded-full h-8 aspect-square flex justify-center items-center"
        >
          <EmojiIcn size={{ width: 40, height: 40 }} />
        </button>

        <input
          ref={textRef}
          type="text"
          placeholder="Type something ..."
          onKeyDown={handleKeyDown}
          className="w-full h-full rounded-full bg-transparent text-white hover:bg-transparent focus:bg-transparent placeholder-slate-300 focus:ring-0 border-0 focus:border-none"
          onChange={(e) => {
            setText(e.target.value.trim());
          }}
        />
        {text ? (
          <div
            className="w-10 aspect-square bg-white flex items-center justify-center rounded-full ml-auto"
            onClick={sendNewMessage}
          >
            <SendIcn size={{ width: 36, height: 32 }} />
          </div>
        ) : (
          <div className="w-9 h-9 aspect-square bg-white flex justify-center items-center rounded-full relative">
            <input
              type="file"
              name="image"
              id="image"
              accept="image/jpeg, image/png, image/webp, image/jpg"
              className="inset-0 w-full h-full absolute opacity-0"
            />
            <TypeBoxSVG />
          </div>
        )}
      </div>
    </>
  );
}

export default TypeBox;
