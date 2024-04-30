import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatUser from "./ChatUser";
import {
  getConnections,
  getRoomWithUserID,
} from "../../../services/User/apiMethods";
import { initFlowbite } from "flowbite";
import { useNavigate } from "react-router-dom";
import { setReduxChatRoom } from "../../../utils/reducers/userReducer";

function ChatList({ setReciever }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.userData);
  const reduxChatRoom = useSelector((state) => state?.user?.chatRooms);
  const [following, setFollowing] = useState([]);
  const [error, setError] = useState("");
  const modalDiv = useRef();

  const [list, setList] = useState([]);
  //fetching rooms and setting it in redux state chat rooms
  useEffect(() => {
    try {
      getRoomWithUserID(user?._id)
        .then((rooms) => {
          const newList = rooms.reduce((acc, curr) => {
            const users = curr.users;
            const otherUser = users.filter((id) => id !== user?._id);
            return acc.concat(otherUser);
          }, []);

          // setList(newList);
          dispatch(setReduxChatRoom(newList));
        })
        .catch((err) => {
          setError(err);
        });
    } catch (error) {
      setError(error);
    }
  }, [user, dispatch]);

  // setting up the chat room in redux state(only user ids are )
  useEffect(() => {
    if (reduxChatRoom) {
      setList(reduxChatRoom);
    }
  }, [reduxChatRoom]);

  //getting connections to show the people user following
  useEffect(() => {
    initFlowbite();
    try {
      if (user) {
        getConnections(user?._id)
          .then((response) => {
            setFollowing(response?.connection?.following);
          })
          .catch((error) => {
            setError(error?.message);
          });
      }
    } catch (error) {
      setError(error?.message);
    }
  }, [user]);

  // to close a modal
  const closeModal = () => {
    modalDiv.current.click();
  };

  return (
    <>
      <div className="w-96 md:h-fit bg-slate-500 p-5 flex flex-col gap-5 rounded-lg">
        <div className="w-full h-14 flex justify-center items-center">
          <span className="font-poppins text-xl font-medium">Messages</span>
          <button
            type="button"
            className="text-3xl font-semibold ml-auto"
            data-modal-target="followers"
            data-modal-toggle="followers"
          >
            +
          </button>
        </div>
        {list?.length > 0
          ? list.map((userId, index) => {
              return (
                <ChatUser
                  key={userId}
                  userId={userId}
                  doFunction={setReciever}
                />
              );
            })
          : null}
      </div>

      <div
        id="followers"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative w-full max-w-2xl max-h-full">
          <div className="relative bg-[#969592] rounded-lg shadow dark:bg-black">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-medium text-black dark:text-white font-poppins">
                People you follow
              </h3>
              <button
                ref={modalDiv}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="followers"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-6 space-y-6">
              {following ? (
                following.map((userId, index) => {
                  return (
                    <div onClick={closeModal} key={userId}>
                      <ChatUser
                        key={userId}
                        doFunction={setReciever}
                        userId={userId}
                      />
                    </div>
                  );
                })
              ) : (
                <span>You not following anyone</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatList;
