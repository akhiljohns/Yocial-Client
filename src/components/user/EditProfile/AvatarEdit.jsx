import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AvatarCard } from "./AvatarCard";
import CreatePostModal from "../Post/CreatePostModal";

function Avatar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userData = useSelector((state) => state?.user?.userData);
  return (
    <>
      <AvatarCard
        setIsModalOpen={setIsModalOpen}
        name={userData?.name}
        imageUrl={userData?.profilePic}
      />
      {isModalOpen && (
        <CreatePostModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          type={"avatar"}
          userProfilePic={userData?.profilePic}
          imagePreview={false}
        />
      )}
    </>
  );
}

export default Avatar;
