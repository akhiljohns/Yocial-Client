import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const UserHome = () => {
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
          dispatch(setUserPosts(response));
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
                return <SinglePostCard post={post} key={post?._id} />;
              })}
            {lastPost && <p className="text-white">No More Posts To Show</p>}

            {loading && !lastPost && (
              <div class="bg">
                <div class="loader"></div>
              </div>
            )}
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default UserHome;
