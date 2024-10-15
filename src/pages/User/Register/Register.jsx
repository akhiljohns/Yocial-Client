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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <div class="flex items-center justify-center min-h-screen bg-black">
  <div class="w-full max-w-sm md:max-w-md bg-black p-4 md:p-8 rounded shadow-sm shadow-white">
    <h1 class="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-center text-white">
      Register
    </h1>
    <div class="flex flex-col md:flex-row gap-2">
      <div class="mb-4 md:w-1/2 w-full">
        <label class="text-white text-sm md:text-base" for="fname">First Name</label>
        <input
          required
          placeholder="First Name"
          type="text"
          id="fname"
          name="fname"
          class="w-full border p-2 rounded text-sm md:text-base"
        />
      </div>
      <div class="mb-4 md:w-1/2 w-full">
        <label class="text-white text-sm md:text-base" for="lname">Last Name</label>
        <input
          required
          placeholder="Last Name"
          type="text"
          id="lname"
          name="lname"
          class="w-full border p-2 rounded text-sm md:text-base"
        />
      </div>
    </div>
    <div class="mb-4">
      <label class="text-white text-sm md:text-base" for="username">Username</label>
      <input
        required
        placeholder="Username"
        type="text"
        id="username"
        name="username"
        class="w-full border p-2 rounded text-sm md:text-base"
      />
    </div>
    <div class="mb-4">
      <label class="text-white text-sm md:text-base" for="email">Email</label>
      <input
        required
        placeholder="Email"
        type="text"
        id="email"
        name="email"
        class="w-full border p-2 rounded text-sm md:text-base"
      />
    </div>
    <div class="flex flex-col md:flex-row gap-2">
      <div class="mb-4 md:w-1/2 w-full">
        <label class="text-white text-sm md:text-base" for="password">Password</label>
        <input
          maxLength={60}
          required
          placeholder="Password"
          type="password"
          id="password"
          name="password"
          class="w-full border p-2 rounded text-sm md:text-base"
        />
      </div>
      <div class="mb-4 md:w-1/2 w-full">
        <label class="text-white text-sm md:text-base" for="password2">Confirm Password</label>
        <input
          maxLength={60}
          required
          placeholder="Confirm Password"
          type="password"
          id="password2"
          name="password2"
          class="w-full border p-2 rounded text-sm md:text-base"
        />
      </div>
    </div>
    <button class="w-full text-white p-2 rounded hover:bg-blue-700 text-sm md:text-base">
      Register
    </button>
    <button class="w-full mb-4 text-white p-2 mt-3 rounded hover:bg-green-700 text-sm md:text-base">
      Already have an account? Login
    </button>
  </div>
</div>

  );
}

export default Register;
