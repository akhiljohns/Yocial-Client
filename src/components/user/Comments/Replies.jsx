import React from "react";
import ProfilePic from "../profiles/ProfilePic";
import NameField from "../profiles/NameField";

function Replies({ replies }) {
  return (
    <>
      <div className="ml-8 mt-2">
        {replies.map((reply, index) => (
          <div key={reply._id} className="flex items-center">
            <ProfilePic
            image={reply.userId.ProfilePic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcGKCd_GQUOkGs0jEYe4teajZ1W6z9WGZIB2pOKPIiYw&s"}
            styleProp={"rounded-full w-8 h-8 aspect-square"}
          />
          <NameField
              name={`${reply.userId.username} : `}
              styleProp={"font-normal text-xs"}
            />
            <span className="text-sm ml-1">{reply.content}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default Replies;
