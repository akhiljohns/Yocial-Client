import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function UserProtect({ children }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.validUser);

  const userData = useSelector((state) => state?.user?.userData);

  if (user && userData) {
    return children;
  } else {
    return navigate("/login");
  }
}

export default UserProtect;
