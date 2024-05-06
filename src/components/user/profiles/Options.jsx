import { initFlowbite } from "flowbite";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/apiMethods";
import { clearUser } from "../../services/apiCalls";

function Options({user}) {

  const [owner, setOwner] = useState(false);
  const navigate = useNavigate()
  const currentUser = useSelector((state) => state?.user?.userData)

  const reportModal = useRef()

  useEffect(() => {
    initFlowbite();

    if(currentUser?._id === user?._id){
        setOwner(true);
    }
  },[currentUser, user]);





  const logout = () => {
    logoutUser(currentUser?._id)
      .then((res) => {
        if (res) {
          clearUser();
        }
        navigate("/login");
      })
      .catch((err) => {
        navigate("/login");
      });
  };

  return (
    <>
      <button
        data-modal-target="popup-modal"
        data-modal-toggle="popup-modal"
        ref={reportModal}
        className="hidden"
        type="button"
      />

      <div
        id="popup-modal"
        tabIndex="-1"
        className="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
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
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to report this profile?
              </h3>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Yes, I'm sure
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        id="dropdownMenuIconButton"
        data-dropdown-toggle="dropdownDots"
        className="inline-flex items-center p-2 text-sm font-medium text-center text-white rounded-lg"
        type="button"
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 4 15"
        >
          <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      </button>

      <div
        id="dropdownDots"
        className="z-10 hidden bg-white text-white divide-y divide-gray-100 rounded-lg shadow w-32 dark:bg-gray-700 dark:divide-gray-600"
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownMenuIconButton"
        >
          {owner ? (
            owner && (
              <>
                <li>
                  <div
                    onClick={() =>
                      navigate(`/profile/${currentUser?.username}/edit`)
                    }
                    className="block px-4 py-2 w-full text-start hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Edit profile
                  </div>
                </li>
                <li>
                  <div
                    onClick={logout}
                    className="block px-4 py-2 w-full text-start hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Logout
                  </div>
                </li>
              </>
            )
          ) : (
            <li>
              <button
                onClick={() => reportModal.current.click()}
                className="block px-4 py-2 w-full text-start text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Report
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* ----------------------------------------------------------------------------- */}
    </>
  );
}

export default Options;
