import React from "react"

const LoginForm = ({
  handleLogin,
  setUsername,
  username,
  setPassword,
  password,
}) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            className="border"
            type="text"
            id="username"
            value={username}
            onChange={({ target }) => {
              setUsername(target.value)
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            className="border"
            type="password"
            name=""
            id="password"
            value={password}
            onChange={({ target }) => {
              setPassword(target.value)
            }}
          />
        </div>
        <button
          type="submit"
          className="rounded py-1 px-2 bg-slate-600 text-white"
          id="loginButton"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
