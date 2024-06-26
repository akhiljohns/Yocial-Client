import React, { useState } from "react";
import UserList from "./UserList";
import { useDispatch, useSelector } from "react-redux";
import Notes from "../Notification/Notes";
import NotifUserList from "../Notification/NotifUserList";
import { deleteNotifications } from "../../../services/User/apiMethods";
import { clearReduxNotifications } from "../../../utils/reducers/notificationReducer";
import { successToast, errorToast } from "../../../hooks/toast";

function UserListsModal({
  type,
  userIds,
  toggleModal,
  choice,
  toggleModalHandler,
}) {
  const [notifEmpty, setNotifEmpty] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.userData);

  let notifications = useSelector(
    (state) => state?.notification?.notifications
  );

  const deleteNotifs = () => {
    deleteNotifications(user._id).then((response) => {
      if (response.status === 200) {
        dispatch(clearReduxNotifications());
        successToast("Notifications deleted");
        setNotifEmpty(true);
      } else {
        errorToast("Error deleting notifications");
      }
    });
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-950 bg-opacity-50">
        <div
          className="bg-white rounded-lg shadow dark:bg-gray-950 p-5 flex flex-col"
          style={{ width: "40%", height: "80%" }}
        >
          <div className="flex justify-center w-full">
            <div className="px-6 py-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 lg:text-xl dark:text-white">
                {choice !== "notification" ? type : "Notifications"}
              </h3>
            </div>

            <button
              type="button"
              onClick={toggleModal}
              className=" text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-4 h-4"
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
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {(notifEmpty || !notifications || notifications.length === 0) && choice== 'notification' ? (
            <h1 className="text-center text-black font-extrabold text-3xl">
              No Notifications
            </h1>
          ) : (
            choice === "notification" && (
              <>
                <div className="w-full h-[85%] overflow-auto">
                  {notifications.map((notification) => (
                    <Notes key={notification?._id} notification={notification} />
                  ))}
                </div>

                <div className="w-full flex items-center px-2 py-3">
                  <button
                    onClick={deleteNotifs}
                    className="ml-auto text-black text-sm hover:font-semibold"
                  >
                    Mark all as read
                  </button>
                </div>
              </>
            )
          )}
          {choice !== "notification" && (
            <UserList closeModal={toggleModal} userIds={userIds} />
          )}
        </div>
      </div>
    </>
  );
}

export default UserListsModal;
