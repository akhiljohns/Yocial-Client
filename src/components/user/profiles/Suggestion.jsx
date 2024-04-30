import React from "react";

function Suggestion({user}) {
  return (
    <>
        <div className="w-fit h-14 flex mt-4 bg-black bg-opacity-80 rounded-3xl">
          {/* User profile image div */}
          <img
            className="w-12 h-12 ml-1 self-center rounded-full"
            src={user?.profilePic}
            alt=""
          />

          <div className="w-56 ml-3 flex self-center">
            {/* User name div */}
            <div className="text-white text-lg font-normal font-['Inika']">
              {user?.name || user?.username}
            </div>

            {/* Follow or unfollow button div */}
            <div className="w-20 h-7 self-center text-center ml-auto mr-2 bg-slate-700 rounded-2xl">
              <button className="text-white text-center font-normal font-['Inika']">
                Follow
              </button>
            </div>
          </div>
        </div>
    </>
  );
}

export default Suggestion;
