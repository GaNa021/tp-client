import { useState } from "react"

function Login({ doLogin }) {
  // State for changing Password view or hide
  const [passwordState, setpasswordState] = useState("password")

  // function for changing Password view or hide
  // return : updates the state of passwaord to show or hide
  function togglePasswordState() {
    setpasswordState(passwordState === "password" ? "text" : "password")
  }

  // main component to be rendered
  return (
    <>
      <div className="md:flex md:justify-center mb-6 py-32">
        <div className="w-96 bg-white border border-black shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <label className="block text-gray-700 text-xl font-bold mb-2">
            LogIn
          </label>
          <br />
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Host
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="host"
              type="text"
              placeholder="Host"
              value="127.0.0.1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Port
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="port"
              type="text"
              placeholder="Port"
              value="13600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value="tpadmin"
            />
          </div>
          <div className="relative w-full mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type={passwordState}
              placeholder="Password"
              value="packetware"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 ">
              <button className="mt-2" onClick={togglePasswordState}>
                <img
                  src={
                    passwordState === "password"
                      ? "https://img.icons8.com/ios/344/closed-eye.png"
                      : "https://img.icons8.com/fluency-systems-regular/344/visible.png"
                  }
                  alt=""
                  className="w-7 h-7"
                />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={() => {
                doLogin(
                  document.getElementById("host").value,
                  document.getElementById("port").value,
                  document.getElementById("username").value,
                  document.getElementById("password").value
                )
              }}
            >
              LogIn
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login

/*
                {passwordState === "password" ? "show" : "hide"}*/
