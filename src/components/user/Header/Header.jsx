// Header.js
import React, { useEffect } from "react";
import { clearUser } from "../../../services/User/apiCalls.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const userData = useSelector((state) => state?.user?.userData);
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.validUser);


  useEffect(() => {
    if (!user || !userData) {
      navigate("/login")
    }
  });

  const handleLogout = () => {
    clearUser();
  };
  return (
    <header className="bg-orange-500 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div onClick={() => navigate(`/profile/${userData.username}`)}>
          Welcome, {userData.name}
        </div>
        <button onClick={handleLogout} className="bg-black px-4 py-2 rounded">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
