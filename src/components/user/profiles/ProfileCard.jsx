import React, { useEffect, useState } from "react";
import SettingsIcn from "../icons/SettingsIcn";
import Options from "./Options";
import { useSelector } from "react-redux";
import ConnectionBtn from "../icons/ConnectionBtn";
import { getConnections } from "../../services/apiMethods";
import ConnectionList from "../modal/ConnectionList";
import { showError } from "../../hooks/errorManagement";
import { useNavigate } from "react-router-dom";

function ProfileCard({ user, admin }) {
  const navigate = useNavigate();

  const [owner, setOwner] = useState(false);

  const currentUser = useSelector((state) => state?.user?.userData);
  const [error, setError] = useState("");

  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    if (user) {
      getConnections(user?._id)
        .then((connections) => {
          setFollowers(connections?.followers);
          setFollowing(connections?.following);
        })
        .catch((error) => {
          setError(error?.message);
        });
    }
  }, [user]);

  useEffect(() => {
    if (user && currentUser) {
      if (currentUser?._id === user?._id) {
        setOwner(true);
      }
    }
  }, [user, currentUser]);

  const [title, setTitle] = useState("");

  return (
    <>
      {title && (
        <ConnectionList title={title} setTitle={setTitle} user={user} />
      )}

      <div className="bg-[#1E1E1EC4] opacity-70 lg:items-center lg:px-60 lg:py-24 w-full p-7 lg:p-0 lg:w-fit h-fit mr-auto ml-auto lg:mt-7 flex lg:grid lg:grid-flow-col lg:gap-20 gap-12 relative select-none lg:rounded">
        {!admin && (
          <div className="absolute lg:w-5 lg:h-5 right-0 top-6 lg:m-8 lg:mr-10">
            <Options user={user} />
          </div>
        )}
        <div className="rounded-full lg:w-36 lg:h-36 w-20 h-20 m-3 lg:m-0 bg-gray-50 relative border-white border-x-2 border-y-2 lg:-ml-20">
          <img
            src={user?.profilePic}
            alt=""
            className="rounded-full aspect-square w-full"
          />
          {owner ? (
            <div
              className="lg:w-9 lg:h-9 hidden lg:block rounded-full absolute bottom-0 right-0 cursor-pointer"
              onClick={() => navigate(`/profile/${currentUser?.username}/edit`)}
            >
              <SettingsIcn size={{ width: 36, height: 36 }} />
            </div>
          ) : null}
        </div>

        <div className="w-1 h-32 bg-black hidden lg:block"></div>

        <div className=" w-fit h-fit text-white self-center mt-3 lg:mt-0">
          <div className="text-lg lg:text-2xl font-medium">
            <span>{user?.name}</span>
          </div>
          <div className="text-sm">
            <span>@{user?.username}</span>
          </div>
          <div className="flex gap-5">
            <div
              onClick={() => setTitle("followers")}
              className="mt-8 grid gap-1"
            >
              <span className="lg:text-xl font-poppins text-center">
                {followers?.length || 0}
              </span>
              <span className="lg:text-sm font-serif text-center">
                Followers
              </span>
            </div>
            <div
              onClick={() => setTitle("following")}
              className="mt-8 grid gap-1"
            >
              <span className="lg:text-xl font-poppins text-center">
                {following?.length || 0}
              </span>
              <span className="lg:text-sm font-serif text-center">
                Following
              </span>
            </div>
          </div>
          {/* follow unfollow btn */}
          {!owner && !admin ? (
            <div className="w-36 mt-3 h-10 flex justify-center items-center">
              <ConnectionBtn
                user={user}
                owner={owner}
                setFollowers={setFollowers}
              />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default ProfileCard;
