import React, { useState } from "react";
import "./login.css";

const Login = ()=> {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="login">
        <form action="" className="login_form">
          <h1>Login Page </h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
          />
          <button>SUBMIT</button>
        
        </form>

        <h1>{email}</h1>
        <h1>{password}</h1>
      </div>
    </>
  );
}

export default Login;
