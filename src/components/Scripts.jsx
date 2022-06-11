import { useState, useEffect } from "react"
import { get, post } from "superagent"
import Alert from "./Alert"

function Scripts(props) {
  const [ScriptsConfig, setScriptsConfig] = useState(null)
  const [Response, setResponse] = useState("")
  const tableHeaders = [
    "Name",
    "Enabled",
    "Type",
    "Language",
    "Class Name/Jar Files",
    "Description",
    "Ext. Process",
    "Remarks",
    "Last Operation",
    "Operated By",
    "Operation Time"
  ]

  useEffect(() => {
    getScriptsConfig()
  }, [])

  return (
    <>
      <DropDown />
      <br />
      {ScriptsConfig != null ? (
        <>
          <div className="shadow-md sm:rounded-lg ml-1 overflow-y-auto h-4/6">
            <table
              id=""
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
              {console.log("ScriptsConfig ::" + ScriptsConfig)}
              <tbody>
                {ScriptsConfig.map((data) => {
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
                      <td className="text-black px-6 py-4">{data.dwType}</td>
                      <td className="text-black px-6 py-4">
                        {data.dwLanguage}
                      </td>
                      <td className="text-black px-6 py-4">
                        {data.strJarFileNamesCsv}
                      </td>
                      <td className="text-black px-6 py-4">
                        {data.strDescription}
                      </td>
                      <td className="text-black px-6 py-4">
                        {data.bRunAsSeparateProcess ? true : false}
                      </td>
                      <td className="text-black px-6 py-4">
                        {data.strRemarks}
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

  // function for retriving Scripts Config
  // return : array of JSON objects with Scripts Config, which is updated in it's state
  function getScriptsConfig() {
    // URL to connect to server
    const URL = "http://" + props.host + ":" + props.port

    //get method with headers
    get(URL + "/GetScriptsConfig")
      .set({
        "Content-Type": "text/plain",
        Authorization: "Bearer " + props.sessionid
      })
      .end((err, res) => {
        if (res.status === 200) {
          setScriptsConfig(res.body)
        } else {
          setResponse(res.body.message)
        }
      })
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
                                Create Script
                              </h3>
                            </div>
                            <div className="relative p-6 flex-auto">
                              <label
                                htmlFor=""
                                className="block text-gray-700 text-sm font-bold mb-2"
                              >
                                Name
                              </label>
                              <input
                                type="text"
                                id=""
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

export default Scripts
