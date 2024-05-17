import React, { useEffect, useState } from "react";
import { getUser } from "../../../services/User/apiMethods";
import { useNavigate } from "react-router-dom";

function NotifProfileField({ notification }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
        <img
          className="w-10 h-10 rounded-full"
          src={notification?.from?.profilePic}
          alt="Rounded avatar"
        ></img>
        <span className="flex-1 ml-3 whitespace-nowrap">
          {notification?.from?.username || notification?.message}
        </span>
      </div>
    </>
  );
}

export default NotifProfileField;
