import React, { useEffect, useState } from "react";
const UserCard = ({ user, seeProfile }) => {
  return (
    <>
      <div
        className="cursor-pointer"
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
          // style={{ aspectRatio:"square" borderRadius: "50%" }}
        />
        <div style={{ marginLeft: "20px", width: "100px" }}>
          <div className="text-base font-bold">{user.username}</div>
          <div className="text-sm font-semibold">{user.name}</div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
