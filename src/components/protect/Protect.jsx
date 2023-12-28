import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protect({ children }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.validUser);

  const userData = useSelector((state) => state?.user?.userData);

  useEffect(() => {
    if (!user || !userData) {
      navigate("/login")
    }
  });

    return children
}

export default Protect;
