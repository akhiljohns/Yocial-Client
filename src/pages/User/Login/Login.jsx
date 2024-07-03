import React, { useEffect, useState } from "react";
import {
  fetchUserDetails,
  getConnections,
  postLogin,
  postMail,
} from "../../../services/User/apiMethods";
import { useNavigate } from "react-router-dom";
import { loginValidate } from "../../../hooks/loginValidate";
import { refreshToken, userAuth } from "../../../const/localStorage";
import { useDispatch, useSelector } from "react-redux";
import {
  setFollowers,
  setFollowing,
  setReduxUser,
} from "../../../utils/reducers/userReducer";
import { Spinner } from "flowbite-react";
import { successToast } from "../../../hooks/toast";
import { setUserPosts } from "../../../utils/reducers/postReducer";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [verify, setVerify] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const user = useSelector((state) => state?.user?.validUser);
  const userData = useSelector((state) => state?.user?.userData);

  useEffect(() => {
    if (user && userData) {
      navigate("/");
    }
  }, [user, userData, navigate]);

  const setCredentials = () => {
    if (!credential) {
      setLoading(false);
      setError("Please enter a username or email");
      return false;
    }
    if (!password) {
      setLoading(false);
      setError("Please enter a password");
      return false;
    }
    const userData = {
      password,
      credential,
    };
    return userData;
  };

  const sendMail = async () => {
    setLoading(true);

    const userData = {
      credential: credential,
    };
    postMail(userData).then((response) => {
      setLoading(false);
      successToast(response.message);
      window.location.reload("/login");
    });
  };

  const handleSubmit = async () => {
    setLoading(true);

    const userData = setCredentials();
    if (!userData || !(await loginValidate(userData, setError))) {
      return false;
    }
    postLogin(userData)
      .then((response) => {
        if (response.status === 200) {
          let userId = response.user._id;
          localStorage.setItem(userAuth, response.tokens.accessToken);
          localStorage.setItem(refreshToken, response.tokens.refreshToken);
          dispatch(setReduxUser({ userData: response.user, validUser: true }));
          getConnections(userId).then((response) => {
            dispatch(setFollowers(response.connection.followers));
            dispatch(setFollowing(response.connection.following));
            fetchUserDetails(userId).then((response) => {
              dispatch(setUserPosts(response?.posts));
              setLoading(false);
              navigate("/");
            });
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        setVerify(false);
        if (error?.userVerified === false) {
          setVerify(true);
          setError(error.message);
        } else {
          setError(error.message);
        }
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="w-full max-w-md bg-black p-8 rounded shadow-sm shadow-white">
          <h1 className="text-2xl font-semibold mb-6 text-center text-white">
            Login
          </h1>
          <div className="mb-4">
            <label className="text-white" htmlFor="credential">
              Username
            </label>
            <input
              required
              placeholder="Email, Username or Mobile Number"
              type="text"
              id="credential"
              name="credential"
              className="w-full border p-2 rounded"
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                setCredential(e.target.value.trim());
              }}
            />
          </div>
          <div className="mb-4">
            <label className="text-white" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                maxLength={60}
                required
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full border p-2 rounded"
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  setPassword(e.target.value.trim());
                }}
              />
              <span
                className="absolute right-2 top-2 cursor-pointer text-white z-50"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <i className="far fa-eye-slash"></i>
                ) : (
                  <i className="far fa-eye"></i>
                )}
              </span>
            </div>
          </div>
          <div className="text-white text-sm mb-4">
            <button
              className="text-blue-500 hover:underline"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "Hide" : "Show"} Password
            </button>
          </div>

          {/* Demo Credentials */}
          <div className="text-white text-center text-sm mb-4 bg-gray-900">
            <p>Demo Username : demouser1</p>
            <p>Demo Password : demouser@1</p>
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

          {verify && (
            <button
              onClick={sendMail}
              className="w-1/2 mx-auto bg-black text-white p-1 rounded hover:bg-blue-700 block"
            >
              Send Verification Mail
            </button>
          )}
          {loading && (
            <div className="w-full flex justify-center items-center">
              <Spinner
                color="info"
                aria-label="Large spinner example"
                size="lg"
              />
            </div>
          )}
          <button
            onClick={() => navigate("/register")}
            className="w-full mb-4 text-white p-2 rounded hover:bg-green-700"
          >
            Dont have an account? Register
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
