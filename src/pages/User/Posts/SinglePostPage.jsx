import React, { useEffect } from "react";
import SinglePostView from "../../../components/user/Modals/SinglePostView";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import UserSideBar from "../../../components/user/Sidebar/UserSideBar";
import Header from "../../../components/user/Header/Header";
function SinglePostPage() {
  const isValid = useSelector((state) => state?.user?.validUser);
  const navigate = useNavigate();

  const { postId } = useParams();

  useEffect(() => {
    if (!isValid) {
      navigate("/login");
    }
  });

  return (
    <>
      <Header choice={"profile"} />
      <UserSideBar />
      {postId ? (
        <div className="h-screen md:w-full w-full items-center flex md:p-20 lg:p-5 overflow-auto">
          <SinglePostView postId={postId} />
        </div>
      ) : null}
    </>
  );
}

export default SinglePostPage;
