import React, { useEffect, useState } from 'react'
import Notes from './Notes';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteNotifications } from '../../../services/User/apiMethods';
import { clearReduxNotifications } from '../../../utils/reducers/notificationReducer';
function NotificationLg({noteToggle, setNoteToggle}) {

  const navigate = useNavigate()
  const dispatch  = useDispatch()
  const user = useSelector((state)=> state?.user?.userData)
  const isValid = useSelector((state) => state?.user?.validUser);
  const [error, setError] = useState('')

  useEffect(()=> {
    if(!user || !isValid){
      navigate("/login");
    }
  })

const notifications = useSelector((state) => state?.notification?.notifications)
 const clearNotifications = () => {
   deleteNotifications(user?._id)
     .then((response) => {
       dispatch(clearReduxNotifications());
     })
     .catch((error) => {
       setError(error?.message);
     });
 };

  return (
    <>
      <h5
        id="drawer-left-label"
        className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
      >
        <svg
          className="w-4 h-4 mr-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        Notifications
      </h5>
      <button
        type="button"
        id="crossBtn"
        data-drawer-hide="drawer-left-example"
        aria-controls="drawer-left-example"
        onClick={() => {
          setNoteToggle(false);
        }}
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
        <span className="sr-only">Close menu</span>
      </button>

      <div className="flow-root">
        {notifications?.length > 0 ? (
          <>
            {/* NOTIFICATIONS  */}
            <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[50rem] overflow-auto">
              {notifications.map((notification) => {
                return (
                  <Notes key={notification?._id} notification={notification} />
                );
              })}
            </ul>

            {/* CLEAR BUTTONS AND MARK AS READ   */}
            <div className="w-full h-4 mb-auto flex mt-5">
              <button className="text-xs font-medium text-gray-600 hover:text-gray-800">
                Mark as read
              </button>
              <button
                onClick={clearNotifications}
                className="ml-auto text-xs font-medium text-gray-600 hover:text-gray-800"
              >
                Clear notifications
              </button>
            </div>
          </>
        ) : (
          <div className="w-full text-center mt-10 text-gray-500">
            <span>No new Notifications</span>
          </div>
        )}
      </div>
    </>
  );
}

export default NotificationLg