import React, { useEffect, useState } from "react";
import { fetchAllUsers } from "../../../services/Admin/apiMethods";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setFollowing } from "../../../utils/reducers/userReducer";
import { followUser, getConnections, unfollowUser } from "../../../services/User/apiMethods";

// IMPORTING COMPONENTS 
import Header from "../../../components/user/Header/Header";
import UserSideBar from "../../../components/user/Sidebar/UserSideBar";

const UserHome = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state)=> state?.user?.userData);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const { validUser, userData,followers,following } = useSelector((state) => state?.user);

  const dispatch = useDispatch()


  useEffect(() => {
    fetchAllUsers()
      .then((response) => {
        setUsers(response.users);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);


  const follow = (user) => {
    followUser(currentUser?._id, user?._id)
      .then((response)=> {
      dispatch(setFollowing(response.userConnection.following))
    })
    .catch((error) => {
      setError(error?.message);
    });
  }
  
  const unfollow = (user) => {
    unfollowUser(currentUser?._id, user?._id)
    .then((response) => {
        dispatch(setFollowing(response.userConnection.following))
      })
      .catch((error) => {
        setError(error?.message);
      });
  };

  const buttonStyles = {
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const UserRow = ({ user }) => (
    <tr key={user._id}>
      <td>
        <div className="flex items-center">
          <img src={user.profilePic} alt="" className="w-8 h-8 rounded-full mr-2" />
          <div>
            <a href="#" className="user-link">
              {user.name}
            </a>
            <span className="user-subhead block">{user.role}</span>
          </div>
        </div>
        </td>
    <td>{user.username}</td>
    <td>
      <div className="flex justify-around">
        {
          !following?.includes(user?._id) ? (
            <button style={{ ...buttonStyles, background: "#4CAF50", color: "#fff" }} onClick={() => follow(user)}>Follow</button>
          ) : (
            <button style={{ ...buttonStyles, background: "#f44336", color: "#fff" }} onClick={() => unfollow(user)}>Unfollow</button>
          )
        }
      </div>
    </td>
  </tr>
);

  const filteredUsers = users.filter(user => user._id !== currentUser?._id);
  return (
    <div className="flex overflow-x-hidden">
      <div className="flex-1 relative">
        <Header choice={"profile"} />
        <UserSideBar />
        <div className="flex items-center justify-center h-screen">
          <div className="w-full max-w-4xl">
            <div className="main-box bg-white p-6 rounded shadow-md">
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
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default UserHome;