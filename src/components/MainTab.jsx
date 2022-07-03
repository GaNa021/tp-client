import { get, post } from "superagent"
import { useEffect, useState } from "react"
import NeGateWays from "./NeGateways"
import Login from "./Login"
import ErrorPage from "../uiComponents/ErrorPage"
import Alert from "../uiComponents/Alert"
import NeSessions from "./NeSessions"

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom"
import Scripts from "./Scripts"
import UsersGroups from "./UsersGroups"
import UsersUsers from "./UsersUsers"
import DropDown from "../uiComponents/DropDown"

function MainTab() {
  // states for storing Host, Port, SessionID
  const [SessionId, setSessionId] = useState("")
  const [ClientInfo, setClientInfo] = useState("")
  const [Host, setHost] = useState("")
  const [Port, setPort] = useState("")
  const [Response, setResponse] = useState("")

  // hook to navigate between pages
  const navigate = useNavigate()

  // ping to server to maintain connection
  const _ping = () => {
    setInterval(ping, 10000)
  }

  // function for storing Session Details in sessionStorage
  // return : updates the Session Details in sessionStorage
  const sessionDetails = () => {
    sessionStorage.getItem("SessionId") != null
      ? setSessionId(sessionStorage.getItem("SessionId"))
      : null

    sessionStorage.getItem("ClientInfo") != null
      ? setClientInfo(sessionStorage.getItem("ClientInfo"))
      : null

    sessionStorage.getItem("Host") != null
      ? setHost(sessionStorage.getItem("Host"))
      : null

    sessionStorage.getItem("Port") != null
      ? setPort(sessionStorage.getItem("Port"))
      : null
  }

  useEffect(() => {
    sessionDetails()
  }, [])

  // main component to be rendered
  return (
    <>
      {SessionId === "" ? (
        <>
          {Response != "" ? (
            <Alert
              defaultState={true}
              resp={Response}
              setResponse={setResponse}
            />
          ) : null}

          <Login doLogin={doLogin} />
        </>
      ) : (
        <>
          <div className="relative grid justify-items-stretch">
            <ul className="md:flex items-center space-x-8 px-2 py-2">
              <div className="grid justify-items-stretch">
                <div className="group relative justify-self-end space-x-2">
                  <li className="no-underline py-2 px-3 text-gray-500 inline-flex hover:text-green-500 transition duration-300 text-center items-center hover:cursor-pointer">
                    NE Interfaces{" "}
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </li>
                  <DropDownNESessions navigate={navigate} />
                </div>
              </div>
              <div className="grid justify-items-stretch">
                <div className="group relative justify-self-end space-x-2">
                  <li className="no-underline py-2 px-3 text-gray-500 inline-flex hover:text-green-500 transition duration-300 text-center items-center hover:cursor-pointer">
                    Catalogs{" "}
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </li>
                  <DropDownCatalogs navigate={navigate} />
                </div>
              </div>
              <li
                className="no-underline py-2 px-2 text-gray-500 hover:text-green-500 transition duration-300 hover:cursor-pointer"
                onClick={() => {
                  navigate("/ErrorPage")
                }}
              >
                SO Applications
              </li>
              <li
                className="no-underline py-2 px-2 text-gray-500 hover:text-green-500 transition duration-300 hover:cursor-pointer"
                onClick={() => {
                  navigate("/ErrorPage")
                }}
              >
                BSS Integrators
              </li>
              <li
                className="no-underline py-2 px-2 text-gray-500 hover:text-green-500 transition duration-300 hover:cursor-pointer"
                onClick={() => {
                  navigate("/ErrorPage")
                }}
              >
                Log & Alarms
              </li>
              <div className="grid justify-items-stretch">
                <div className="group relative justify-self-end space-x-2">
                  <li className="no-underline py-2 px-3 text-gray-500 inline-flex hover:text-green-500 transition duration-300 text-center items-center hover:cursor-pointer">
                    Users & Groups{" "}
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </li>
                  <DropDownUsers navigate={navigate} />
                </div>
              </div>
              <li
                className="no-underline py-2 px-2 text-gray-500 hover:text-green-500 transition duration-300 hover:cursor-pointer"
                onClick={() => {
                  navigate("/ErrorPage")
                }}
              >
                Settings & Tools
              </li>
              <li>
                <Link
                  to="/Traces"
                  className="no-underline py-2 px-2 text-gray-500 hover:text-green-500 transition duration-300"
                >
                  Traces
                </Link>
              </li>
            </ul>

            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 ">
              <button
                className="-mt-8 justify-self-end bg-red-400 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                onClick={doLogout}
              >
                LogOut
              </button>
            </div>
          </div>

          <Routes>
            <Route exact path="/" element={<Login />}></Route>
            <Route
              exact
              path="/NEInterfaces/NeGateways"
              element={
                <NeGateWays
                  host={Host}
                  port={Port}
                  sessionid={SessionId}
                  ClientInfo={ClientInfo}
                />
              }
            ></Route>
            <Route
              exact
              path="/NEInterfaces/NeSessions"
              element={
                <NeSessions
                  host={Host}
                  port={Port}
                  sessionid={SessionId}
                  ClientInfo={ClientInfo}
                />
              }
            ></Route>
            <Route
              exact
              path="/Catalogs/Scripts"
              element={
                <Scripts
                  host={Host}
                  port={Port}
                  sessionid={SessionId}
                  ClientInfo={ClientInfo}
                />
              }
            ></Route>
            <Route
              exact
              path="/UsersGroups"
              element={
                <UsersGroups
                  host={Host}
                  port={Port}
                  sessionid={SessionId}
                  ClientInfo={ClientInfo}
                />
              }
            ></Route>
            <Route
              exact
              path="/UsersUsers"
              element={
                <UsersUsers
                  host={Host}
                  port={Port}
                  sessionid={SessionId}
                  ClientInfo={ClientInfo}
                />
              }
            ></Route>
            <Route exact path="/SOApplications" element={<ErrorPage />}></Route>
            <Route exact path="/BSSIntegrators" element={<ErrorPage />}></Route>
            <Route exact path="/Log&Alarms" element={<ErrorPage />}></Route>
            <Route exact path="/Users&Groups" element={<ErrorPage />}></Route>
            <Route exact path="/Settings&Tools" element={<ErrorPage />}></Route>
            <Route exact path="/Traces" element={<ErrorPage />}></Route>
            <Route exact path="/ErrorPage" element={<ErrorPage />}></Route>
          </Routes>
        </>
      )}
    </>
  )

  // function to Login
  // return : SessionID, which is updated in it's state
  function doLogin(host, port, username, password) {
    // URL to connect to server
    const URL = "http://" + host + ":" + port

    // Credentials for Login
    const credentials = {
      userName: username,
      plainPassword: password,
      host: host,
      language: "en",
      mgmtClientType: 4,
      securityQuestion: "",
      securityAnswer: "",
      newPlainPassword: "",
      callbackURL: ""
    }

    //post method with headers
    post(URL + "/login")
      .send(credentials)
      .set({ "Content-Type": "application/json" })
      .end((err, res) => {
        if (res.status === 200) {
          setHost(host)
          setPort(port)
          setSessionId(res.body[0])
          setClientInfo("localhost<>@<>" + username + "<>@<>en<>@<>WUI<>@<>")

          navigate("/NEInterfaces/NeGateways")

          sessionStorage.setItem("SessionId", res.body[0])
          sessionStorage.setItem("Host", host)
          sessionStorage.setItem("Port", port)
          sessionStorage.setItem(
            "ClientInfo",
            "localhost<>@<>" + username + "<>@<>en<>@<>WUI<>@<>"
          )
        } else {
          setResponse(res.body.message)
        }
      })
  }

  // function to Logout
  // return : removes SessionID, which is updated in it's state
  function doLogout() {
    // URL to connect to server
    const URL = "http://" + Host + ":" + Port

    //get method with headers
    get(URL + "/logout")
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + SessionId,
        "client-info": ClientInfo + SessionId
      })
      .end((err, res) => {
        if (res.status === 200) {
          setSessionId("")
          navigate("/")

          sessionStorage.clear()
        }
      })
  }

  // function to ping
  function ping() {
    // URL to connect to server
    const URL = "http://" + Host + ":" + Port

    //get method with headers
    get(URL + "/ping")
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + SessionId
      })
      .end((err, res) => {})
  }
}

// function to rendering Dropdown for Ne Interfaces Module
function DropDownNESessions(props) {
  const li_styles =
    "py-2 hover:text-green-500 transition duration-300 hover:cursor-pointer"
  const dropDownStyle = `absolute bg-white rounded shadow w-44 group-hover:block hidden`

  return (
    <>
      <div className={dropDownStyle}>
        <ul className="py-2 text-gray-700">
          <li className={li_styles}>
            <button
              onClick={() => {
                props.navigate("/NEInterfaces/NeGateways")
              }}
            >
              NE Gateways
            </button>
          </li>
          <li className={li_styles}>
            <button
              onClick={() => {
                props.navigate("/NEInterfaces/NeSessions")
              }}
            >
              NE Sessions
            </button>
          </li>
          <li className={li_styles}>
            <button
              onClick={() => {
                props.navigate("/ErrorPage")
              }}
            >
              NE Selection
            </button>
          </li>
          <li className={li_styles}>
            <button
              onClick={() => {
                props.navigate("/ErrorPage")
              }}
            >
              NE Manager
            </button>
          </li>
          <li className={li_styles}>
            <button
              onClick={() => {
                props.navigate("/ErrorPage")
              }}
            >
              NE Buffered Cmds
            </button>
          </li>
          <li className={li_styles}>
            <button
              onClick={() => {
                props.navigate("/ErrorPage")
              }}
            >
              NE Perf Analysis
            </button>
          </li>
        </ul>
      </div>
    </>
  )
}

// function to rendering Dropdown for Catalogs Module
function DropDownCatalogs(props) {
  const li_styles =
    "py-2 hover:text-green-500 transition duration-300 hover:cursor-pointer"
  const dropDownStyle = `absolute bg-white rounded shadow w-44 group-hover:block hidden`

  return (
    <>
      <div className={dropDownStyle}>
        <ul className="py-2 text-gray-700">
          <li className={li_styles}>
            <button
              onClick={() => {
                props.navigate("/Catalogs/Scripts")
              }}
            >
              Scripts
            </button>
          </li>
          <li className={li_styles}>
            <button
              onClick={() => {
                props.navigate("/ErrorPage")
              }}
            >
              Scheduler
            </button>
          </li>
          <li className={li_styles}>
            <button
              onClick={() => {
                props.navigate("/ErrorPage")
              }}
            >
              SA Catalogs
            </button>
          </li>
        </ul>
      </div>
    </>
  )
}

// function to rendering Dropdown for Catalogs Module
function DropDownUsers(props) {
  const li_styles =
    "py-2 hover:text-green-500 transition duration-300 hover:cursor-pointer"
  const dropDownStyle = `absolute bg-white rounded shadow w-44 group-hover:block hidden`

  return (
    <>
      <div className={dropDownStyle}>
        <ul className="py-2 text-gray-700">
          <li
            className={li_styles}
            onClick={() => {
              props.navigate("/UsersGroups")
            }}
          >
            Groups
          </li>
          <li
            className={li_styles}
            onClick={() => {
              props.navigate("/UsersUsers")
            }}
          >
            Users
          </li>
          <li
            className={li_styles}
            onClick={() => {
              props.navigate("/ErrorPage")
            }}
          >
            LoggedIn Users
          </li>
          <li
            className={li_styles}
            onClick={() => {
              props.navigate("/ErrorPage")
            }}
          >
            Users History
          </li>
          <li
            className={li_styles}
            onClick={() => {
              props.navigate("/ErrorPage")
            }}
          >
            Auth Settings
          </li>
        </ul>
      </div>
    </>
  )
}
export default MainTab
