import React, { useState } from "react";
import { searchUser } from "../../../services/User/apiMethods";
const Header = React.lazy(() =>
  import("../../../components/user/Header/Header")
);
const UserSideBar = React.lazy(() =>
  import("../../../components/user/Sidebar/UserSideBar")
);

function SearchUsers() {
  // const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);

  const handleSearchInput = (key) => {
    if (!key) return setUsers([]);

    searchUser(key)
      .then((response) => {
        setUsers(response);
        console.log(users);
      })
      .catch(() => {
        setUsers([]);
      });
  };

  return (
    <>
      <Header choice={"home"} />
      <UserSideBar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        {/* Input field for searching users */}
        <input
          type="text"
          placeholder="Search users..."
          onChange={(e) => handleSearchInput(e.target.value)}
        />
        {/* Display user cards */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {users.length && users.map((user, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",   
                borderRadius: "5px",
                padding: "10px",
                margin: "10px",
                backgroundColor: "white",
              }}
            >
              <img
                src={user.profilePic}
                alt={user.name}
                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              />
              <div>Name: {user.name}</div>
              <div>Username: {user.username}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SearchUsers;
