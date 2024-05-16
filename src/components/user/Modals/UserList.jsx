import React from "react";
import ProfileField from "./ProfileField";

function UserList({ userIds, closeModal }) {
  return (
    <div
      className="overflow-y-auto overflow-x-hidden flex flex-col gap-5 w-full"
    >
      {/* <ul className="my-4 space-y-3 h-fit cursor-pointer overflow-auto"> */}
        {userIds?.map((id, index) => (
          <>
            <ProfileField closeModal={closeModal} userId={id} key={id} />
          </>
        ))}
      {/* </ul> */}
    </div>
  );
}

export default UserList;
