import React, { useEffect, useState } from "react";
import { fetchAllUsers } from "../../../services/Admin/apiMethods";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setFollowing } from "../../../utils/reducers/userReducer";
import {
  fetchUserPosts,
  followUser,
  getAllPosts,
  getConnections,
  unfollowUser,
} from "../../../services/User/apiMethods";
import SinglePostCard from "../../../components/user/SinglePostCard/SinglePostCard";

// IMPORTING COMPONENTS
import Header from "../../../components/user/Header/Header";
import UserSideBar from "../../../components/user/Sidebar/UserSideBar";
import {
  clearLoadedPosts,
  setLoadedPosts,
  setUserPosts,
} from "../../../utils/reducers/postReducer";

const UserHome = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state?.user?.userData);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const { validUser, userData, followers, following } = useSelector(
    (state) => state?.user
  );

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
        getAllPosts(page)
        .then((response) => {
          const newPosts = response.posts;
          dispatch(setLoadedPosts(newPosts));
        })
        .catch((error) => {
              setError(error?.message);
            })
            .finally(() => {
              setLoading(false);
            });
          } catch (error) {
            setError(error?.message);
          }
    }
  }, [page, dispatch, lastPost]);

  // useEffect(() => {
  //   if(!lastPost){
  //     const postContainer = document.getElementById("post-container");
  //     postContainer.addEventListener("scroll", () => {
  //       if (postContainer) {
  //         const { scrollTop, scrollHeight, clientHeight } = postContainer;
  //         if (scrollTop + clientHeight >= scrollHeight && !loading) {
  //           setLoading(true);
  //           setPage(page + 1);
  //         }
  //       }
  //     });
  //   }
  // });

  // to fetch the user posts
  useEffect(() => {
    if (validUser) {
      fetchUserPosts(userData?._id)
        .then((response) => {
          dispatch(setUserPosts(response));
        })
        .catch((error) => {
          setError(error);
        });
    }
  }, []);

  
  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      dispatch(clearLoadedPosts());
    });
  });
  
  const filteredUsers = users.filter((user) => user._id !== currentUser?._id);
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
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default UserHome;




// const follow = (user) => {
//   followUser(currentUser?._id, user?._id)
//     .then((response) => {
//       dispatch(setFollowing(response.userConnection.following));
//     })
//     .catch((error) => {
//       setError(error?.message);
//     });
// };

// const unfollow = (user) => {
//   unfollowUser(currentUser?._id, user?._id)
//     .then((response) => {
//       dispatch(setFollowing(response.userConnection.following));
//     })
//     .catch((error) => {
//       setError(error?.message);
//     });
// };




  // const buttonStyles = {
  //   padding: "8px 16px",
  //   borderRadius: "4px",
  //   cursor: "pointer",
  //   transition: "background-color 0.3s ease",
  // };

  







  // const UserRow = ({ user }) => (




{/* Follow Users Section  */}
{/* <div className="main-box bg-white p-6 rounded shadow-md">
  //   <tr key={user._id}>
  //     <td>
  //       <div className="flex items-center">
  //         <img
  //           src={user.profilePic}
  //           alt=""
  //           className="w-8 h-8 rounded-full mr-2"
  //         />
  //         <div>
  //           <a href="#" className="user-link">
  //             {user.name}
  //           </a>
  //           <span className="user-subhead block">{user.role}</span>
  //         </div>
  //       </div>
  //     </td>
  //     <td>{user.username}</td>
  //     <td>
  //       <div className="flex justify-around">
  //         {!following?.includes(user?._id) ? (
  //           <button
  //             style={{ ...buttonStyles, background: "#4CAF50", color: "#fff" }}
  //             onClick={() => follow(user)}
  //           >
  //             Follow
  //           </button>
  //         ) : (
  //           <button
  //             style={{ ...buttonStyles, background: "#f44336", color: "#fff" }}
  //             onClick={() => unfollow(user)}
  //           >
  //             Unfollow
  //           </button>
  //         )}
  //       </div>
  //     </td>
  //   </tr>
  // );
<div className="table-responsive">
                <table className="table user-list w-full">
                  <thead>
                    <tr>
                      <th className="py-2">
                        <span>Name</span>
                      </th>
                      <th className="py-2">
                        <span>Username</span>
                      </th>
                      <th className="py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <UserRow key={user._id} user={user} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div> */}