import React, { useEffect, useState } from "react";
import { useFetcher, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchNotifications,
  fetchSuggestedUsers,
  fetchUserPosts,
  getAllPosts,
} from "../../../services/User/apiMethods";
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
import UserList from "../../../components/user/Modals/UserList";
import UserListsModal from "../../../components/user/Modals/UserListsModal";
import UserCard from "../Search/UserCard";
import { setReduxNotifications } from "../../../utils/reducers/notificationReducer";
import MobileBottomBar from "../../../components/user/Sidebar/MobileBottomBar";

const UserHome = () => {
  //likes
  // const likesModal = useRef();
  // const closeLikeModal = useRef();
  const [likePost, setLikePost] = useState();
  const [likesModalOpen, setLikesModalOpen] = useState(false);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
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
          fetchSuggestedUsers(userData?._id).then((res) => {
            setSuggestedUsers(res.uniqueSuggestedMutualFriends);
          });
        })
        .catch((error) => {
          errorToast(error);
        });
    }
  }, []);

  useEffect(() => {
    fetchNotifications(userData?._id)
      .then((response) => {
        dispatch(
          setReduxNotifications({ notifications: response.notifications })
        );
      })
      .catch((error) => {
        errorToast(error.message);
      });
  });

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      dispatch(clearLoadedPosts());
    });
  });

  const toggleLikesModal = () => {
    setLikesModalOpen(!likesModalOpen);
  };

  const seeProfile = (username) => {
    navigate(`/profile/${username}`);
  };
  return (
    <div className="flex overflow-x-hidden">
      <div className="flex-1 relative flex justify-center">
        <Header choice={"profile"} />
        <UserSideBar />

        <div className="w-full flex items-center justify-center">
          <div
            id="posts-container"
            className="p-2 w-[90%] md:w-1/2 h-screen flex flex-col items-center gap-10 pt-24 overflow-auto no-scrollbar"
          >
            <div className="hidden md:block   fixed mt-[1%] ml-[66%]">
              <div className="text-black p-4 rounded-lg shadow-lg w-80">
                <h3 className="text-lg font-semibold mb-2 text-white text-center">
                  Suggested Users
                </h3>
                <div className="divide-y divide-white">
                  {suggestedUsers && suggestedUsers.length > 0 ? (
                    suggestedUsers.map((user, index) => (
                      <UserCard
                        seeProfile={seeProfile}
                        user={user}
                        key={index}
                        className="p-2"
                        style={{ width: "300px", height: "60px" }}
                      />
                    ))
                  ) : (
                    <p className="text-center text-white">
                      No suggested users available
                    </p>
                  )}
                </div>
              </div>
            </div>
            {loadedPosts &&
              loadedPosts.length > 1 &&
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
        <UserListsModal
          type={"Likes"}
          userIds={likePost}
          toggleModal={toggleLikesModal}
          choice={"Likes"}
        />
      )}
      <MobileBottomBar />
    </div>
  );
};

export default UserHome;
