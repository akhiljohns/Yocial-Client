import React, { useState } from "react";
import { searchUser } from "../../../services/User/apiMethods";
import { debounce } from "lodash"; // Import debounce function from lodash
import { Spinner } from "flowbite-react";

const Header = React.lazy(() =>
  import("../../../components/user/Header/Header")
);
const UserSideBar = React.lazy(() =>
  import("../../../components/user/Sidebar/UserSideBar")
);

function SearchUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noUsersFound, setNoUsersFound] = useState(false);

  // Define a debounced search function
  const debouncedSearch = debounce((key) => {
    if (!key) {
      setUsers([]);
      setLoading(false);
      setNoUsersFound(false);
      return;
    }

    setLoading(true);

    searchUser(key)
      .then((response) => {
        setLoading(false);
        if (response.length > 0) {
          setUsers(response);
          setNoUsersFound(false);
        } else {
          setUsers([]);
          setNoUsersFound(true);
        }
      })
      .catch(() => {
        setLoading(false);
        setUsers([]);
        setNoUsersFound(true);
      });
  }, 300); // Adjust the debounce time as needed (e.g., 300 milliseconds)

  // Function to handle search input change
  const handleSearchInput = (event) => {
    const { value } = event.target;
    debouncedSearch(value);
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
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Input field for searching users */}
          <input
            type="text"
            placeholder="Search users..."
            onChange={handleSearchInput}
            style={{ marginRight: "10px" }}
          />
          {/* Display loading icon if searching */}
          {loading && (
            <div className="spinner-border text-white" role="status">
              <Spinner
                color="info"
                aria-label="Large spinner example"
                size="lg"
              />
            </div>
          )}
        </div>
        {/* Display message if no users found */}
        {noUsersFound && <p className="text-white">No users found</p>}
        {/* Display user cards */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {users.map((user) => (
            <div
              key={user.id}
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
