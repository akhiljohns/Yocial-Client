import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminProtect({ children }) {
  const navigate = useNavigate();
  const isValid = useSelector((state) => state?.admin?.validAdmin);

  const adminData = useSelector((state) => state?.admin?.adminData);

  useEffect(() => {
    if (!isValid || !adminData) {
      navigate("/admin/login")
    }
  });

    return children
}

export default AdminProtect;
