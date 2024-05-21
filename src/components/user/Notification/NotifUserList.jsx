import React from "react";
import NotifProfileField from "./NotifProfileField";

function NotifUserList({ notification }) {
  return (
    <div className="overflow-y-auto overflow-x-hidden flex flex-col gap-5 w-full">
      {/* <ul className="my-4 space-y-3 h-fit cursor-pointer overflow-auto"> */}

      <NotifProfileField notification={notification} />

      {/* </ul> */}
    </div>
  );
}

export default NotifUserList;
