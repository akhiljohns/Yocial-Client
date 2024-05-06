import React, { useEffect, useState } from "react";
import { passwordValidate, regValidate } from "../../../hooks/regValidation";
import { postRegister } from "../../../services/User/apiMethods";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { errorToast, successToast } from "../../../hooks/toast";
import StrengthMeter from "../../../components/user/Options/PasswordStregth";

function Register() {
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [poorPassword, setPoorPassword] = useState(false);
  const [weakPassword, setWeakPassword] = useState(false);
  const [strongPassword, setStrongPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.validUser);

  const passCheck = (pass) => {
    passwordValidate(
      pass,
      setPasswordError,
      setPoorPassword,
      setWeakPassword,
      setStrongPassword
    );
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }, [error]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const userData = {
        fName,
        lName,
        username,
        email,
        password,
        password2,
      };
      if (await regValidate({ ...userData, setErr: setError })) {
        postRegister(userData)
          .then((response) => {
            setLoading(false);
            if (response.status === 200) {
              successToast(response.message);
              navigate("/login");
            } else {
              setLoading(false);
              setError(response.message);
            }
          })
          .catch((error) => {
            setLoading(false);
            setError(error?.message);
          });
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      errorToast(error.message || "Something went wrong, Try after some time");
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="w-full max-w-md bg-black p-8 rounded shadow-sm shadow-white">
        <h1 className="text-2xl font-semibold mb-6 text-center text-white">
          Register
        </h1>
        <div className="flex gap-2">
          <div className="mb-4 w-1/2">
            <label className="text-white" htmlFor="fname">
              First Name
            </label>
            <input
              required
              placeholder="First Name"
              type="text"
              id="fname"
              name="fname"
              className="w-full border p-2 rounded"
              onChange={(e) => {
                setFname(e.target.value.trim());
              }}
              disabled={loading}
            />
          </div>
          <div className="mb-4 w-1/2">
            <label className="text-white" htmlFor="lname">
              Last Name
            </label>
            <input
              required
              disabled={loading}
              placeholder="Last Name"
              type="text"
              id="lname"
              name="lname"
              className="w-full border p-2 rounded"
              onChange={(e) => {
                setLname(e.target.value.trim());
              }}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="text-white" htmlFor="username">
            Username
          </label>
          <input
            required
            disabled={loading}
            placeholder="Username"
            type="text"
            id="username"
            name="username"
            className="w-full border p-2 rounded"
            onChange={(e) => {
              setUsername(e.target.value.trim());
            }}
          />
        </div>
        <div className="mb-4">
          <label className="text-white" htmlFor="email">
            Email
          </label>
          <input
            required
            placeholder="Email"
            type="text"
            disabled={loading}
            id="email"
            name="email"
            className="w-full border p-2 rounded"
            onChange={(e) => {
              setEmail(e.target.value.trim());
            }}
          />
        </div>
        <div className="flex gap-2">
          <div className="mb-4">
            <label className="text-white" htmlFor="password">
              Password
            </label>
            <input
              maxLength={60}
              required
              disabled={loading}
              placeholder="Password"
              type="password"
              id="password"
              name="password"
              className="w-full border p-2 rounded"
              onChange={(e) => {
                setpassword(e.target.value.trim());
                passCheck(e.target.value);
              }}
            />
          </div>

          <div className="mb-6">
            <label className="text-white" htmlFor="password2">
              Confirm Password
            </label>
            <input
              maxLength={60}
              required
              disabled={loading}
              placeholder="Confirm Password"
              type="password"
              id="password2"
              name="password2"
              className="w-full border p-2 rounded"
              onChange={(e) => {
                setPassword2(e.target.value.trim());
              }}
            />
          </div>
        </div>
        {password ? (
          <div className="mt-2 flex justify-items-start">
            <StrengthMeter
              poorPassword={poorPassword}
              weakPassword={weakPassword}
              strongPassword={strongPassword}
              passwordError={passwordError}
            />
          </div>
        ) : null}
        {loading ? (
          <div className="py-1 w-full flex justify-center items-center">
            <div className="w-12 h-12 border-4 border-dotted border-white rounded-full animate-spin">
              <div className="w-6 h-6 border-4 border-dotted border-orange-500 rounded-full animate-spin-reverse mx-auto"></div>
            </div>
          </div>
        ) : null}

        {error ? (
          <div className="text-red-600 text-sm  text-center font-extralight">
            {error}
          </div>
        ) : null}

        <button
          onClick={handleSubmit}
          className="w-full text-white p-2 rounded hover:bg-blue-700"
        >
          Register
        </button>

        <button
          onClick={() => navigate("/login")}
          className="w-full mb-4 text-white p-2 mt-3 rounded hover:bg-green-700"
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
}

export default Register;
