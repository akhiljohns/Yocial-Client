import React, { useEffect, useState } from "react";
import FollowBtn from "./FollowBtn";
const UserCard = ({ user,buttonText, onButtonClick, seeProfile ,userFollowing}) => {
  
  const [following, setFollowing] = useState(Array.isArray(userFollowing) ? userFollowing.includes(user._id) : false);

  return (
    <>
      <div
        onClick={() => seeProfile(user?.username)}
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
          // style={{ width: "60px", height: "60px", borderRadius: "50%" }}
          // style={{ aspectRatio:"square" borderRadius: "50%" }}
        />
        <div style={{ marginLeft: "20px" ,width: "100px" }}>
          <div className="text-base font-bold">{user.username}</div>
          <div className="text-sm font-semibold">{user.name}</div>
        </div>
      <div className="ml-[380px]">
        <FollowBtn following={following}/>
      </div>
      </div>
    </>
  );
};

export default UserCard;
