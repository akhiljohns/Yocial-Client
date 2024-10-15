import React from "react";

const UserCard = ({ user, seeProfile }) => {
  return (
    <div
      className="cursor-pointer flex items-center border rounded-full p-2 my-2 bg-gray-300 sm:w-56 sm:ml-14"
      onClick={() => seeProfile(user?.username)}
    >
      <img
        className="aspect-square w-14 rounded-full"
        src={user.profilePic}
        alt={user.name}
      />
      <div className="ml-4">
        <div className="text-base font-bold">{user.username}</div>
        <div className="text-sm font-semibold">{user.name}</div>
      </div>
    </div>
  );
};

export default UserCard;
