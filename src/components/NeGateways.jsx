import { useState, useEffect } from "react"
import { get, post } from "superagent"
import Alert from "./Alert"

function NeGateWays(props) {
  // State for storing NeGateway configs as JSON objects
  const [NeGatewayConfig, setNeGatewayConfig] = useState(null)
  const [Response, setResponse] = useState("")
  var selectedNeGateWays = []

  const tableHeaders = [
    "Name",
    "Enabled",
    "Type/Version",
    "Host",
    "Connection",
    "Last Connected Time",
    "Trace",
    "Remarks",
    "Last Operation",
    "Operated By",
    "Operation Time"
  ]

  useEffect(() => {
    getNeGateWays()
  }, [])

  // main component to be rendered
  return (
    <>
      <DropDown
        refresh={getNeGateWays}
        create={createGateway}
        delete={deleteGateway}
        enable={enableGateway}
        disable={disableGateway}
      />
      <br />
      {NeGatewayConfig != null ? (
        <>
          <div className="shadow-md sm:rounded-lg ml-1 overflow-y-auto h-4/6">
            <table
              id="NeGatewaysTable"
              className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
            >
              <thead className="text-xs uppercase dark:bg-slate-500">
                <tr>
                  <th scope="col" className="px-6 py-3"></th>{" "}
                  {tableHeaders.map((_headers) => {
                    return (
                      <th scope="col" className="text-white px-6 py-3">
                        {_headers}
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {NeGatewayConfig.map((data) => {
                  return (
                    <tr key={data.strName} className="bg-white border-b-2">
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-1"
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label htmlFor="checkbox-table-1" className="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
                      <td className="text-black px-6 py-4">{data.strName}</td>
                      <td className="text-black px-6 py-4">
                        {data.bEnabled ? "True" : "False"}
                      </td>
                      <td className="text-black px-6 py-4">
                        {data.strVersionInformation}
                      </td>
                      <td className="text-black px-6 py-4">{data.strHost}</td>
                      <td className="text-black px-6 py-4">
                        {data.bConnected ? "True" : "False"}
                      </td>
                      <td className="text-black px-6 py-4">
                        {data.dwLastConnectionOkTimestampMs}
                      </td>
                      <td className="text-black px-6 py-4">
                        {data.dwTraceLevel}
                      </td>
                      <td className="text-black px-6 py-4">
                        {data.strSystemRemarks}
                      </td>
                      <td className="text-black px-6 py-4">
                        {data.strLastOperation}
                      </td>
                      <td className="text-black px-6 py-4">
                        {data.strLastOperatedUser}
                      </td>
                      <td className="text-black px-6 py-4">
                        {data.dwLastOperationTimeMs}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : null}

      {Response != "" ? (
        <Alert defaultState={true} resp={Response} setResponse={setResponse} />
      ) : null}
    </>
  )

  // function for retriving NeGateways config
  // return : array of JSON objects with NeGateways config, which is updated in it's state
  function getNeGateWays() {
    // URL to connect to server
    const URL = "http://" + props.host + ":" + props.port

    //get method with headers
    get(URL + "/GetGatewaysConfig")
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.sessionid
      })
      .end((err, res) => {
        if (res.status === 200) {
          setNeGatewayConfig(res.body)
        } else {
          setResponse(res.body.message)
        }
      })
  }

  // function for creating a new NeGateway
  // return : NeGatewayConfig state is updated after creating a new NeGateway
  function createGateway() {
    const negatewayconfig = {
      bConnected: false,
      bConnectionAlarmRaised: false,
      bEnabled: false,
      bExternalGateway: false,
      bRunning: false,
      dwLastConnectionOkTimestampMs: 0,
      dwLastOperationTimeMs: 0,
      dwLastRunningTime: 0,
      dwPort: 0,
      dwTraceLevel: 2,
      strBackupNodesCsv: "",
      strDescription: "",
      strHost: "localhost",
      strLastOperatedUser: "",
      strLastOperation: "",
      strName: document.getElementById("newNewGatewayName").value,
      strOwnerNode: "",
      strRunningOnNode: "",
      strSystemRemarks: "",
      strVersionInformation: "",
      strVirtualIP: "",
      strVirtualIPInterface: ""
    }

    // URL to connect to server
    const URL = "http://" + props.host + ":" + props.port

    //post method with headers
    post(URL + "/AddGateway")
      .send(negatewayconfig)
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.sessionid,
        "client-info": props.ClientInfo + props.sessionid
      })
      .end((err, res) => {
        if (res.status === 200) {
          getNeGateWays()
        } else {
          setResponse(res.body.message)
        }
      })
  }

  // function for deleting a new NeGateway
  // return : NeGatewayConfig state is updated after deleting a NeGateway
  function deleteGateway() {
    // URL to connect to server
    const URL = "http://" + props.host + ":" + props.port

    getSelectedRow()
    for (let index = 0; index < selectedNeGateWays.length; index++) {
      //get method with headers
      get(URL + "/RemoveGateway/" + selectedNeGateWays[index])
        .set({
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.sessionid,
          "client-info": props.ClientInfo + props.sessionid
        })
        .end((err, res) => {
          if (res.status === 200) {
            getNeGateWays()
          } else {
            setResponse(res.body.message)
          }
        })
    }
  }

  // function for enabling a new NeGateway
  // return : NeGatewayConfig state is updated after enabling a NeGateway
  function enableGateway() {
    // URL to connect to server
    const URL = "http://" + props.host + ":" + props.port

    getSelectedRow()
    for (let index = 0; index < selectedNeGateWays.length; index++) {
      //get method with headers
      get(URL + "/EnableGateway")
        .query({ strGatewayName: selectedNeGateWays[index] })
        .set({
          "Content-Type": "text/plain",
          Authorization: "Bearer " + props.sessionid,
          "client-info": props.ClientInfo + props.sessionid
        })
        .end((err, res) => {
          if (res.status === 200) {
            getNeGateWays()
          } else {
            setResponse(res.body.message)
          }
        })
    }
  }

  // function for disabling a new NeGateway
  // return : NeGatewayConfig state is updated after disabling a NeGateway
  function disableGateway() {
    // URL to connect to server
    const URL = "http://" + props.host + ":" + props.port

    getSelectedRow()
    for (let index = 0; index < selectedNeGateWays.length; index++) {
      //get method with headers
      get(URL + "/DisableGateway")
        .query({ strGatewayName: selectedNeGateWays[index] })
        .set({
          "Content-Type": "text/plain",
          Authorization: "Bearer " + props.sessionid,
          "client-info": props.ClientInfo + props.sessionid
        })
        .end((err, res) => {
          if (res.status === 200) {
            getNeGateWays()
          } else {
            setResponse(res.body.message)
          }
        })
    }
  }

  function getSelectedRow() {
    //Reference the Table.
    var grid = document.getElementById("NeGatewaysTable")

    //Reference the CheckBoxes in Table.
    var checkBoxes = grid.getElementsByTagName("Input")
    var message = ""

    //Loop through the CheckBoxes.
    for (var i = 0; i < checkBoxes.length; i++) {
      if (checkBoxes[i].checked) {
        var row = checkBoxes[i].parentNode.parentNode.parentNode
        selectedNeGateWays.push(row.cells[1].innerHTML)
      }
    }
  }
}

function DropDown(props) {
  const [showMenu, setshowMenu] = useState(props.defaultState)
  const [showModal, setShowModal] = useState(false)

  function submit() {
    setShowModal(false)
    toggleshowMenu()
    props.create()
  }

  function toggleshowMenu() {
    setshowMenu(!showMenu)
  }

  return (
    <>
      <div className="grid justify-items-stretch">
        <div className="justify-self-end space-x-2">
          <div>
            <button
              id="dropdownDefault"
              data-dropdown-toggle="dropdown"
              className="hover:bg-gray-100 text-black py-1 px-3 rounded-full text-center inline-flex items-center"
              type="button"
              onClick={toggleshowMenu}
            >
              <img
                src="https://img.icons8.com/color/344/settings--v2.png"
                alt="Operations Menu"
                className="w-8 h-7"
              />
            </button>
            {showMenu ? (
              <div className="absolute bg-white rounded shadow w-44 right-0">
                <ul className="py-2 text-gray-700">
                  <li
                    className="py-2 hover:text-green-500 transition duration-300 hover:cursor-pointer"
                    onClick={() => setShowModal(true)}
                  >
                    New
                  </li>
                  {showModal ? (
                    <>
                      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-4/12 my-6 mx-auto max-w-3xl">
                          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="flex items-start justify-between p-3 border-b border-solid border-slate-200 rounded-t">
                              <h3 className="text-3xl text-black font-semibold">
                                Create Gateway
                              </h3>
                            </div>
                            <div className="relative p-6 flex-auto">
                              <label
                                htmlFor="negatewayname"
                                className="block text-gray-700 text-sm font-bold mb-2"
                              >
                                Name
                              </label>
                              <input
                                type="text"
                                id="newNewGatewayName"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              />
                            </div>
                            <div className="flex items-center justify-end p-3 border-t border-solid border-slate-200 rounded-b">
                              <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(false)}
                              >
                                Close
                              </button>
                              <button
                                className="bg-emerald-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={submit}
                              >
                                Save Changes
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                  ) : null}
                  <li
                    className="py-2 hover:text-green-500 transition duration-300 hover:cursor-pointer"
                    onClick={() => {
                      props.delete()
                      toggleshowMenu()
                    }}
                  >
                    Delete
                  </li>
                  <li
                    className="py-2 hover:text-green-500 transition duration-300 hover:cursor-pointer"
                    onClick={() => {
                      props.refresh
                      toggleshowMenu()
                    }}
                  >
                    Refresh
                  </li>
                  <li
                    className="py-2 hover:text-green-500 transition duration-300 hover:cursor-pointer"
                    onClick={props.enable}
                  >
                    Enable
                  </li>
                  <li
                    className="py-2 hover:text-green-500 transition duration-300 hover:cursor-pointer"
                    onClick={props.disable}
                  >
                    Disable
                  </li>
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  )
}

export default NeGateWays

/*
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
*/
