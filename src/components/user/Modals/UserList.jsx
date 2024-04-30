import React from "react";
import ProfileField from "./ProfileField";

function UserList({ userIds, closeModal }) {
  return (
    <div
      className="p-6 overflow-y-auto"
      style={{ maxHeight: "calc(100vh - 100px)" }}
    >
      <ul className="my-4 space-y-3  cursor-pointer">
        {userIds?.map((id, index) => (
          <>
            <ProfileField closeModal={closeModal} userId={id} key={id} />
          </>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
