import React, { useEffect, useState } from "react";
import { fetchAllUsers } from "../../../services/Admin/apiMethods";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { followUser, getConnections, unfollowUser } from "../../../services/User/apiMethods";
import Header from "../../../components/user/Header/Header";
import { setFollowing } from "../../../utils/reducers/userReducer";

const UserHome = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state)=> state?.user?.userData);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const { validUser, userData,followers,following } = useSelector((state) => state?.user);

  const dispatch = useDispatch()


  useEffect(() => {
    console.log(following);
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
      console.log(response.userConnection.following);
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
              <button onClick={() => follow(user)}>Follow</button>
            ) : (
              <button onClick={() => unfollow(user)}>Unfollow</button>
            )
          }
        </div>
      </td>
    </tr>
  );

  const filteredUsers = users.filter(user => user._id !== currentUser?._id);
  return (
  <>
  
    <Header choice={"profile"} />
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
    </>
  );
};

export default UserHome;