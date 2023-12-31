import React, { useEffect, useState } from "react";
import { fetchAllUsers } from "../../../services/Admin/apiMethods";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserRow = React.memo(({ user }) => (
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
      <a
        className={`${
          user.verified ? "text-green-500" : "text-red-500"
        } font-bold`}
      >
        {user.verified ? "Verified" : "Not Verified"}
      </a>
    </td>
    <td>{user.email}</td>
    <td className="w-1/5">
      <div className="flex justify-around">
        <button className="bg-blue-500 text-white px-2 py-1 rounded">
          Action
        </button>
      </div>
    </td>
  </tr>
));

const AdminHome = () => {
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

  return (
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
    </div>
  );
};

export default AdminHome;
