// Header.js
import React, { useEffect } from "react";
import { clearUser } from "../../../services/User/apiCalls.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = ({ choice }) => {
  const userData = useSelector((state) => state?.user?.userData);
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.validUser);

  useEffect(() => {
    if (!user || !userData) {
      navigate("/login");
    }
  }, [user, userData, navigate]);

  const handleLogout = () => {
    clearUser();
  };

  return (
    <header className="bg-orange-500 p-4 z-30 text-white absolute w-screen">
      <div className="container mx-auto flex justify-between items-center">
        {choice === "profile" ? (
          <div onClick={() => navigate(`/profile/${userData?.username}`)}>
            Welcome, {userData?.name}
          </div>
        ) : (
          <div onClick={() => navigate(`/`)}>
            Go Home
          </div>
        )}

        <button onClick={handleLogout} className="bg-black px-4 py-2 rounded">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;