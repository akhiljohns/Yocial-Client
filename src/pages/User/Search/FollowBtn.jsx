import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../../services/User/apiMethods";
import { setFollowing } from "../../../utils/reducers/userReducer";

const FollowBtn = ({ user,userData }) => {
  const dispatch = useDispatch();

  const userFollowing = useSelector((state) => state?.user.following);


  const handleClick = () => {
    if (!userFollowing.includes(user._id)) {
      // console.log('userData._id , user._id :>> ', userData._id , user._id);
      console.log('userFollowing :>> ', userFollowing);
      followUser(userData._id, user._id).then((response) => {
        dispatch(setFollowing(response.userConnection.following));
        console.log('userFollowing :>> ', userFollowing);
      });
    } else {
      // console.log('userData._id , user._id :>> ', userData._id , user._id);
      console.log('userFollowing :>> ', userFollowing);
      unfollowUser(userData._id, user._id).then((response) => {
        // console.log("response :>> ", response.userConnection.followers);
        dispatch(setFollowing(response.userConnection.followers));
        console.log('userFollowing :>> ', userFollowing);
      });
    }
  };
  return (
    <button
      onClick={handleClick}
      className="full-rounded relative inline-block bg-white border-none transition-all duration-100 shadow-md hover:bg-blue-500 hover:text-white hover:scale-105"
    >
      {userFollowing.includes(user._id) ? (
        <span className="text-gray-700">Unfollow</span>
      ) : (
        <span className="text-gray-700">Follow</span>
      )}

      <div className="absolute top-1/2 left-1/2 w-36 h-12 transform -translate-x-1/2 -translate-y-1/2 border-full-rounded border-transparent transition-all duration-300 hover:border-white"></div>
    </button>
  );
};

export default FollowBtn;
