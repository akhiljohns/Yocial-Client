import React, { useState } from "react";
import {
  followUser,
  searchUser,
  unfollowUser,
} from "../../../services/User/apiMethods";
import { debounce } from "lodash"; // Import debounce function from lodash
import { Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput";
import UserCard from "./UserCard";
import { useSelector } from "react-redux";
// Lazy-loaded components
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
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state?.user);

  // Define a debounced search function
  const debouncedSearch = debounce((key) => {
    if (!key) {
      setUsers([]);
      setLoading(false);
      setNoUsersFound(false);
      return;
    }

    // Wrap the search function with startTransition
    React.startTransition(() => {
      setLoading(true);
      searchUser(key)
        .then((response) => {
          setUsers(response);
          setNoUsersFound(response.length === 0);
        })
        .catch(() => {
          setUsers([]);
          setNoUsersFound(true);
        })
        .finally(() => setLoading(false));
    });
  }, 300); // Adjust the debounce time as needed (e.g., 300 milliseconds)

  // Function to handle search input change
  const handleSearchInput = (event) => {
    const { value } = event.target;
    debouncedSearch(value);
  };

  const seeProfile = (username) => {
    navigate(`/profile/${username}`);
  };
  return (
    <>
      <React.Suspense
        fallback={<Spinner color="info" aria-label="Loading..." size="lg" />}
      >
        <Header choice={"home"} />
        <UserSideBar />
      </React.Suspense>
      <div className="flex justify-center h-screen overflow-hidden">
        <div className="mt-24 overflow-auto w-full justify-center flex">
          {/* Input field for searching users */}
          <SearchInput handleSearchInput={handleSearchInput} />
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
          {/* Display message if no users found */}
          {noUsersFound && <p className="text-white mt-16">No users found</p>}
          {/* Display user cards */}
          <div className="mt-16">
            {users.map((user, index) => (
              <UserCard
                seeProfile={seeProfile}
                user={user}
                key={index}
                style={{ width: "700px", height: "80px" }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchUsers;
