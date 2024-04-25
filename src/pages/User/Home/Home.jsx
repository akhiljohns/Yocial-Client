import React, { useEffect, useState } from "react";
import { useFetcher, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchUserPosts, getAllPosts } from "../../../services/User/apiMethods";
import SinglePostCard from "../../../components/user/SinglePostCard/SinglePostCard";
import "./Home.css";

// IMPORTING COMPONENTS
import Header from "../../../components/user/Header/Header";
import UserSideBar from "../../../components/user/Sidebar/UserSideBar";
import {
  clearLoadedPosts,
  setLoadedPosts,
  setUserPosts,
} from "../../../utils/reducers/postReducer";
import { errorToast } from "../../../hooks/toast";
import LikesModal from "../../../components/user/Modals/LikesModal";
import UserList from "../../../components/user/Modals/UserList";

const UserHome = () => {
  //likes
  // const likesModal = useRef();
  // const closeLikeModal = useRef();
  const [likePost, setLikePost] = useState();
  const [likesModalOpen, setLikesModalOpen] = useState(false);

  const navigate = useNavigate();
  const { validUser, userData } = useSelector((state) => state?.user);

  //auth check
  useEffect(() => {
    if (!userData || !validUser) {
      navigate("/login");
    }
  }, [userData, validUser, navigate]);

  const dispatch = useDispatch();

  const lastPost = useSelector((state) => state?.userPosts?.lastPost);

  //pagination related
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //fetching common posts from redux store
  const loadedPosts = useSelector((state) => state?.userPosts?.loadedPosts);

  //fetching common posts and setting it to redux store
  useEffect(() => {
    if (!lastPost) {
      try {
        setLoading(true);
        setTimeout(() => {
          // For Seamless Addition of new posts
          getAllPosts(page)
            .then((response) => {
              const newPosts = response.posts;
              dispatch(setLoadedPosts(newPosts));
            })
            .catch((error) => {
              errorToast(error?.message);
            })
            .finally(() => {
              setLoading(false);
            });
        }, 1000);
      } catch (error) {
        errorToast(error?.message);
      }
    }
  }, [page, dispatch, lastPost]);

  useEffect(() => {
    if (!lastPost) {
      const postContainer = document.getElementById("posts-container");
      postContainer.addEventListener("scroll", () => {
        if (postContainer) {
          const { scrollTop, scrollHeight, clientHeight } = postContainer;
          if (scrollTop + clientHeight >= scrollHeight && !loading) {
            setLoading(true);
            setPage(page + 1);
          }
        }
      });
    }
  });

  // to fetch the user posts
  useEffect(() => {
    if (validUser) {
      fetchUserPosts(userData?._id)
        .then((response) => {
          dispatch(setUserPosts(response.posts));
        })
        .catch((error) => {
          errorToast(error);
        });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      dispatch(clearLoadedPosts());
    });
  });

  const toggleLikesModal = () => {
    setLikesModalOpen(!likesModalOpen);
  };

  return (
    <div className="flex overflow-x-hidden ">
      <div className="flex-1  relative flex justify-center">
        <Header choice={"profile"} />
        <UserSideBar />
        <div className="w-full flex items-center justify-center ">
          <div
            id="posts-container"
            className="p-2 w-1/2 h-screen flex flex-col items-center gap-10 pt-24 overflow-auto no-scrollbar"
          >
            {loadedPosts &&
              loadedPosts?.map((post, index) => {
                return (
                  <SinglePostCard
                    post={post}
                    key={index}
                    setLikePost={setLikePost}
                    toggleLikesModal={toggleLikesModal}
                  />
                );
              })}
            {lastPost && <p className="text-white">No More Posts To Show</p>}

            {loading && !lastPost && (
              <div className="bg">
                <div className="loader"></div>
              </div>
            )}
          </div>
          <ToastContainer />
        </div>
      </div>

      {likesModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div
            className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-4"
            style={{ width: "80%", height: "80%" }}
          >
            <button
              type="button"
              onClick={toggleLikesModal}
              className="absolute top-2 right-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
            <div className="px-6 py-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 lg:text-xl dark:text-white">
                Likes
              </h3>
            </div>
            <div className="mt-4">
              <UserList closeModal={toggleLikesModal} userIds={likePost} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserHome;
