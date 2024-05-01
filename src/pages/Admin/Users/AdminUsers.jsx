import React, { useEffect, useState } from "react";
import { blockUnblockUser, fetchAllUsers } from "../../../services/Admin/apiMethods";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminHeader from "../../../components/admin/Header/AdminHeader";
import AdminSideBar from "../../../components/admin/Sidebar/AdminSideBar";


const AdminUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const adminData = useSelector((state) => state?.admin?.adminData);
  const isValid = useSelector((state) => state?.admin?.validAdmin);

  useEffect(() => {
    fetchAllUsers()
      .then((response) => {
        setUsers(response.users);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const handleToggleBlock = (userId,blocked) => {
    blockUnblockUser(userId, !blocked)
      .then((response) => {
        const updatedUsers = users.map((user) =>
          user._id === response.user._id ? response.user : user
        );
        setUsers(updatedUsers);
        toast.success(response.message, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((error) => {
        setError(error?.message);
      });
  };

  const UserRow = ({ user }) => (
    <tr key={user._id}>
      <td className="flex items-center">
        <img src={user.profilePic} alt="" className="w-8 h-8 rounded-full mr-2" />
        <div>
          <a href="#" className="user-link">
            {user.name}
          </a>
          <span className="user-subhead block">{user.role}</span>
        </div>
      </td>
      <td>{user.username}</td>
      <td className="text-center">
        <a className={`${user.verified ? "text-green-500" : "text-red-500"} font-bold`}>
          {user.verified ? "Verified" : "Not Verified"}
        </a>
      </td>
      <td>{user.email}</td>
      <td className="w-1/5">
            <div className="flex justify-around">
              <button
                type="button"
                onClick={() => handleToggleBlock(user._id, user.blocked)}
                className={`text-white bg-${user.blocked ? "blue" : "red"}-700 hover:bg-${user.blocked ? "blue" : "red"}-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
              >
                {user.blocked ? "Unblock" : "Block"}
              </button>
            </div>
          </td>
    </tr>
  );

  return (
    <>
      <AdminHeader choice={"profile"}/>
      <AdminSideBar/>
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
                  <th className="text-center py-2">
                    <span>Email Status</span>
                  </th>
                  <th className="py-2">
                    <span>Email</span>
                  </th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
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

export default AdminUsers;