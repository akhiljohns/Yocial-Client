import React, { useEffect, useState } from "react";
import {  regValidate } from "../../../hooks/regValidation";
import { postRegister } from "../../../services/User/apiMethods";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Register() {

  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");



  const navigate = useNavigate();
  const user = useSelector((state)=>state?.user?.validUser);

  useEffect(()=>{
    if(user){
      navigate('/')
    }
  }, [navigate, user])


  const handleSubmit = async () => {
    try {
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
            if (response.status === 200) {
              alert(response.message);
              navigate("/login");
            } else {
              setError(response.message);
            }
          })
          .catch((error) => {
            setError(error?.message);
          });
      }
    } catch (error) {
      setError("Something went wrong, Try after some time");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="w-full max-w-md bg-black p-8 rounded shadow-sm shadow-white">
        <h1 className="text-2xl font-semibold mb-6 text-center text-white">Register</h1>
        <div className="flex gap-2">
          <div className="mb-4 w-1/2">
            <label className="text-white" htmlFor="fname">First Name</label>
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
            />
          </div>
          <div className="mb-4 w-1/2">
            <label className="text-white" htmlFor="lname">Last Name</label>
            <input
              required
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
          <label className="text-white" htmlFor="username">Username</label>
          <input
            required
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
          <label className="text-white" htmlFor="email">Email</label>
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
        <div className="flex gap-2">
          <div className="mb-4">
            <label className="text-white" htmlFor="password">Password</label>
            <input
              required
              placeholder="Password"
              type="password"
              id="password"
              name="password"
              className="w-full border p-2 rounded"
              onChange={(e) => {
                setpassword(e.target.value.trim());
              }}
            />
          </div>
          <div className="mb-6">
            <label className="text-white" htmlFor="password2">Confirm Password</label>
            <input
              required
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
        {error ? (
          <div className="text-red-600 text-sm font-extralight">! {error}</div>
        ) : null}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
