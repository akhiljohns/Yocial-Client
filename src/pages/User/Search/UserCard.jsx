import React, { useEffect, useState } from "react";
import FollowBtn from "./FollowBtn";
import { followUser, unfollowUser } from "../../../services/User/apiMethods";
import { useSelector } from "react-redux";
import {
  setFollowers,
  setFollowing,
} from "../../../utils/reducers/userReducer";

const UserCard = ({ user, userData, seeProfile }) => {
  // const handleClick = () => {
  //   if (!userFollowing.includes(user._id)) {
  //     followUser(userData._id, user._id).then((response) => {
  //       dispatch(setFollowing(response.userConnection.following));
  //     });
  //   } else {
  //     unfollowUser(userData._id, user._id).then((response) => {
  //       console.log("response :>> ", response.userConnection.followers);
  //       dispatch(setFollowing(response.userConnection.followers));
  //     });
  //   }
  // };

  return (
    <>
      <div
        // onClick={() => seeProfile(user?.username)}
        style={{
          display: "flex",
          alignItems: "center",
          border: "1px solid #ccc",
          borderRadius: "50px",
          padding: "10px",
          margin: "10px",
          backgroundColor: "#dedfe0",
          width: "700px",
          height: "80px",
        }}
      >
        <img
          className="aspect-square w-14 rounded-full"
          src={user.profilePic}
          alt={user.name}
        />
        <div style={{ marginLeft: "20px", width: "100px" }}>
          <div className="text-base font-bold">{user.username}</div>
          <div className="text-sm font-semibold">{user.name}</div>
        </div>
        {userData._id !== user._id && (
          <div className="ml-[380px]">
            <FollowBtn user={user} userData={userData} />
          </div>
        )}
      </div>
    </>
  );
};

export default UserCard;
