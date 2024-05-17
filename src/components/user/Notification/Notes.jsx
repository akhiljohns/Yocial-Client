import React, { useEffect, useState } from "react";
import { getUser } from "../../../services/User/apiMethods";
import { getTimeDifference } from "../../../hooks/timeAgo";

function Notes({ notification }) {
  const [error, setError] = useState("");
  const [fromUser, setFromUser] = useState();
  const [time, setTime] = useState("");

  useEffect(() => {
    if (notification) {
      getUser(notification?.from?._id)
        .then((response) => {
          setFromUser(response.user[0]);
        })
        .catch((error) => {
          setError(error?.message);
        });
    }
  }, [notification]);

  useEffect(() => {
    const diff = getTimeDifference(notification?.createdAt);
    setTime(diff);
  }, [notification]);

  return (
    <>
      <li
        className={`py-3 sm:py-4 ${
          notification?.isRead ? "" : "bg-[#69686838]"
        } px-3 rounded cursor-pointer overflow-y-auto overflow-x-hidden flex flex-col gap-5 w-full hover:bg-[#69686873]`}
      >
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <img
              className="w-8 h-8 rounded-full"
              src={fromUser?.profilePic}
              alt=""
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              <span className="font-semibold">{fromUser?.username}</span>{" "}
              <span>{notification?.message}</span>
            </p>
          </div>
          <div className="inline-flex items-center font-thin text-xs text-gray-900 dark:text-white">
            {time}
          </div>
        </div>
      </li>
    </>
  );
}

export default Notes;
