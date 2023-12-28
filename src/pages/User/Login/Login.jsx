import React, { useEffect, useState } from "react";
import { postLogin } from "../../../services/User/apiMethods";
import { useNavigate } from "react-router-dom";
import { loginValidate } from "../../../hooks/loginValidate";
import { refreshToken, userAuth } from "../../../const/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { setReduxUser } from "../../../utils/reducers/userReducer";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const user = useSelector((state)=> state?.user?.validUser);
  const userData = useSelector((state)=> state?.user?.userData)

  useEffect(() => {
    if(user && userData){
        navigate("/")
    }
  });


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
      credential
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

  const handleSubmit = async () => {
    const userData = setCredentials();
    if (!userData  || !(await loginValidate(userData, setError))) {
      return false;
    }
    postLogin(userData)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem(userAuth, response.tokens.accessToken);
          localStorage.setItem(refreshToken, response.tokens.refreshToken);
          dispatch(setReduxUser({ userData: response.user, validUser: true }));
          navigate("/");
        } else {
          setError(response.message);
        }
      })
      .catch((error) => {
        setError(error?.response?.message || error?.message);
      });
  };

  return (
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

        {error ? (
          <div className="text-red-600 text-sm font-extralight">! {error}</div>
        ) : null}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
