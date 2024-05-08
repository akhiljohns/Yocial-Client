import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminProtect({ children }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.validUser);
  const userData = useSelector((state) => state?.user?.userData);

  useEffect(() => {
    if (!user || userData.role !== "admin") { // Adjusted condition here
      navigate("/login");
    }
  }, [user, userData, navigate]); // Added dependencies to useEffect

  return user && userData.role === "admin" ? children : null; // Render children only if user is admin
}

export default AdminProtect;
