import React, { useEffect, useState } from "react";
import { getConnections, postLogin, postMail } from "../../../services/User/apiMethods";
import { useNavigate } from "react-router-dom";
import { loginValidate } from "../../../hooks/loginValidate";
import { refreshToken, userAuth } from "../../../const/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { setReduxUser } from "../../../utils/reducers/userReducer";
import { Spinner } from "flowbite-react";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const user = useSelector((state) => state?.user?.validUser);
  const userData = useSelector((state) => state?.user?.userData);
  const [verify, setVerify] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && userData) {
      navigate("/");
    }
  }, [navigate]);

  const setCredentials = () => {
    if (!credential) {
      setError("Please enter a username or email");
      return false;
    }
    if (!password) {
      setError("Please enter a password");
      return false;
    }
    const userData = {
      password,
      credential,
    };
    // if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credential)) {
    //   userData.email = credential;
    // } else if (/^\d+$/.test(credential)) {
    //   userData.phone = credential;
    // } else if (/^[a-zA-Z0-9_-]+$/.test(credential)) {
    //   userData.username = credential;
    // }
    return userData;
  };

  const sendMail = async () => {
    setLoading(true);

    const userData = {
      credential: credential,
    };
    postMail(userData).then((response) => {
      setLoading(false);

      alert(response.message);
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
        setLoading(false);
        if (response.status === 200) {
          localStorage.setItem(userAuth, response.tokens.accessToken);
          localStorage.setItem(refreshToken, response.tokens.refreshToken);
          dispatch(setReduxUser({ userData: response.user, validUser: true }));

//           getConnections(response.user._id).then((response) => {
// console.log("ffff",response)
// })
navigate("/");
        } else if (response.userVerified == false) {
          setVerify(true);
          setError(response.message);
        } else {
          setError(response.message);
        }
      })
      .catch((error) => {
        setError(
          error?.response?.message ||
            error?.message ||
            "SOMETHING WENT WRONG, TRY AGAIN LATER"
        );
      });
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
              onChange={(e) => {
                setCredential(e.target.value.trim());
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
