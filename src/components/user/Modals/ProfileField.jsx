import React, { useEffect, useState } from 'react'
import { getUser } from '../../../services/User/apiMethods';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProfileField({userId, follow, setTitle}) {
    const navigate = useNavigate()

    const currentUser = useSelector((state)=> state?.user?.userData);

    const [user, setUser] = useState({})
    useEffect(()=> {
        getUser(userId).then((response)=> {
            setUser(response[0]);
        })
    },[userId]);

    const seeProfile = () => {
      if(setTitle){
        setTitle('')
      }


      navigate(`/profile/${user?.username}`);
    }

  return (
    <>
      {user && (
        <div
          onClick={seeProfile}
          className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
        >
          <img
            className="w-10 h-10 rounded-full"
            src={user?.profilePic}
            alt="Rounded avatar"
          ></img>
          <span className="flex-1 ml-3 whitespace-nowrap">
            {user?.username || user?.name}
          </span>
          {currentUser?._id !== user?._id ? (
            !follow ? (
              <button className="inline-flex  items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 border rounded dark:bg-gray-700 dark:text-gray-400 hover:bg-slate-500 hover:text-white">
                Follow
              </button>
            ) : (
              <button className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 border rounded dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-500 hover:text-white">
                Unfollow
              </button>
            )
          ) : null}
        </div>
      )}
    </>
  );
}

export default ProfileField