import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateReduxUser } from "../../../utils/reducers/userReducer";
import { Spinner } from "flowbite-react";
import { errorToast, infoToast, successToast } from "../../../hooks/toast";
import { checkEmail } from "../../../hooks/regValidation";
import { AvatarCard } from "./AvatarCard";
import CreatePostModal from "../Post/CreatePostModal";

function Avatar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const dispatch = useDispatch();

  // const [loading, setLoading] = useState(false);

  const userData = useSelector((state) => state?.user?.userData);

  // useEffect(() => {
  //   if (userData) {
  //     setEmail(userData?.email);
  //   }
  // }, [userData]);

  // const handleSubmit = async () => {
  //   if (userData?.email && userData?.email === email) {
  //     errorToast("You are already using this email");
  //     return;
  //   }

  //   setLoading(true);
  //   const emailValid = await checkEmail(email);

  //   if (!emailValid) {
  //     errorToast("Enter A Valid Email Address");
  //     setLoading(false);
  //   } else {
  //     const userDetails = {
  //       newEmail: email,
  //       userId: userData?._id,
  //       username: userData?.username,
  //       email: userData?.email,
  //       type: "update",
  //     };
  //     updateUserEmail(userDetails)
  //       .then((response) => {
  //         if (response.status === 200) {
  //           setLoading(false);
  //           successToast(response?.message);
  //         } else {
  //           setLoading(false);
  //           infoToast(response?.message);
  //         }
  //       })
  //       .catch((err) => {
  //         setLoading(false);
  //         errorToast(err.message);
  //       });
  //   }
  // };

  return (
    <>
      <AvatarCard setIsModalOpen={setIsModalOpen} name={userData?.name} imageUrl={userData?.profilePic} />
      {isModalOpen && (
      <CreatePostModal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      type={"avatar"}
      />
    )}
    </>
  );
}

export default Avatar;
