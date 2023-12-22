import React from 'react'

function Login() {
  return (
 <>
        <div>
      <div >
        <h1>Log In</h1>
        <form>
        <input type="email" id="credential" name="credential" label="Email/Username" placeholder="email/username" autofocus={true}/>
        <input type="password" id="password" name="password" label="Password" placeholder="••••••••••" />
        <button value="Submit" />
          
        </form>
      </div>
    </div>
 </>
  )
}

export default Login