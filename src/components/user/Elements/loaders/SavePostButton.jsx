import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeSavedPost,
  savePost,
} from "../../../../services/User/apiMethods";
import { updateSavedPosts } from "../../../../utils/reducers/userReducer";
import { errorToast } from "../../../../hooks/toast";

function SavePostButton({ postId }) {
  const [saved, setSaved] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.user?.userData);
  useEffect(() => {
    setSaved(user?.savedPosts?.includes(postId));
  });

  const saveOrRemovePost = () => {
    if (saved) {
      setSaved(false);
      removeSavedPost(user?._id, postId)
        .then((res) => {
          dispatch(updateSavedPosts(res?.post?._id));
        })
        .catch((err) => {
          errorToast(err);
        });
    } else {
      setSaved(true);
      savePost(user?._id, postId)
        .then((res) => {
          dispatch(updateSavedPosts(res?.post?._id));
        })
        .catch((err) => {
          errorToast(err);
        });
    }
  };

  return (
    <>
      <svg
        onClick={saveOrRemovePost}
        className="cursor-pointer ml-auto mr-2"
        width={26}
        height={25}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill={saved ? "black " : "grey"}
      >
        <path
          fill={""}
          fillRule="evenodd"
          d="M4 5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v15.138a1.5 1.5 0 0 1-2.244 1.303l-5.26-3.006a1 1 0 0 0-.992 0l-5.26 3.006A1.5 1.5 0 0 1 4 20.138V5zm11 4a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h6z"
          clipRule="evenodd"
        ></path>
      </svg>
    </>
  );
}

export default SavePostButton;
