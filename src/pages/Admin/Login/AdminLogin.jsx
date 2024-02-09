import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginValidate } from "../../../hooks/loginValidate";
import { adminPostLogin } from "../../../services/Admin/apiMethods";
import { setReduxAdmin } from "../../../utils/reducers/adminReducer";
import { Spinner } from "flowbite-react";
import { adminAuth, adminRefresh } from "../../../const/localStorage";
import { useDispatch, useSelector } from "react-redux";

function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const adminData = useSelector((state) => state?.admin?.adminData);
  const isValid = useSelector((state) => state?.admin?.validAdmin);

  useEffect(() => {
    if (isValid || adminData) {
      navigate("/admin/home");
    }
  }, [isValid, adminData, navigate]);

  const setCredentials = () => {
    if (!email) {
      setError("Please enter email");
      return null;
    }
    if (!password) {
      setError("Please enter a password");
      return null;
    }

    return {
      password: password,
      email: email,
    };
  };

  const handleSubmit = async () => {
    setLoading(true);

    const adminData = setCredentials();

    if (!adminData || !(await loginValidate(adminData, setError))) {
      setLoading(false);
      return;
    }

    const response = await adminPostLogin(adminData);

    if (response.status === 200) {
      localStorage.setItem(adminAuth, response?.adminTokens?.accessToken);
      localStorage.setItem(adminRefresh, response?.adminTokens?.refreshToken);
      dispatch(
        setReduxAdmin({
          adminData: response.admin,
          validAdmin: response.valid,
        })
      );
    } else {
      setError(response.message);
    }

    setLoading(false);
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="w-full max-w-md bg-black p-8 rounded shadow-sm shadow-white">
          <h1 className="text-2xl font-semibold mb-6 text-center text-white">
            Admin Login
          </h1>
          <div className="mb-4">
            <label className="text-white" htmlFor="email">
              Email
            </label>
            <input
              required
              placeholder="Email"
              type="text"
              id="email"
              name="email"
              className="w-full border p-2 rounded"
              onChange={(e) => {
                setEmail(e.target.value.trim());
              }}
            />
          </div>
          <div className="mb-4">
            <label className="text-white" htmlFor="password">
              Password
            </label>
            <input
              maxLength={6}
              required
              placeholder="Password"
              type="password"
              id="password"
              name="password"
              className="w-full border p-2 rounded"
              onChange={(e) => {
                setPassword(e.target.value.trim());
              }}
            />
          </div>
          {error && (
            <div className="text-red-600 text-sm font-medium text-center">
              {error}
            </div>
          )}
          <button
            onClick={handleSubmit}
            className="w-full mb-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          >
            Login
          </button>

          {loading && (
            <div className="w-full flex justify-center items-center">
              <Spinner
                color="info"
                aria-label="Large spinner example"
                size="lg"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
