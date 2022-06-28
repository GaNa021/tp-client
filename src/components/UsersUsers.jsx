import { useState, useEffect } from "react"
import { get, post } from "superagent"
import Alert from "../uiComponents/Alert"

function UsersUsers(props) {
  // State for storing Users configs as JSON objects
  const [UsersConfig, setUsersConfig] = useState(null)
  const [Response, setResponse] = useState("")

  const tableHeaders = [
    "Name",
    "Group",
    "Enabled",
    "Lock Status",
    "Expiry Days",
    "Comments",
    "Last Login Time",
    "Last Logout Time",
    "Last Operation",
    "Operated By",
    "Operation Time"
  ]

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <>
      {UsersConfig != null ? (
        <>
          <div className="shadow-md sm:rounded-lg ml-1 overflow-y-auto h-4/6">
            <table
              id="UserssTable"
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
                {UsersConfig.map((data) => {
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
                      <td className="text-black px-6 py-4">
                        {data.strUserName}
                      </td>
                      <td className="text-black px-6 py-4">
                        {data.strUserGroup}
                      </td>
                      <td className="text-black px-6 py-4">
                        {data.bIsEnabled ? "True" : "False"}
                      </td>
                      <td className="text-black px-6 py-4">
                        {data.bIsLocked ? "True" : "False"}
                      </td>
                      <td className="text-black px-6 py-4">
                        {data.dwPasswordAge}
                      </td>
                      <td className="text-black px-6 py-4">
                        {data.strComment}
                      </td>
                      <td className="text-black px-6 py-4">
                        {data.strLastLoginTimestamp}
                      </td>
                      <td className="text-black px-6 py-4">
                        {data.strLastLogoutTimestamp}
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

  // function for retriving Users config
  // return : array of JSON objects with Users config, which is updated in it's state
  function getUsers() {
    // URL to connect to server
    const URL = "http://" + props.host + ":" + props.port

    //get method with headers
    get(URL + "/GetUsers")
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.sessionid
      })
      .end((err, res) => {
        if (res.status === 200) {
          setUsersConfig(res.body)
        } else {
          setResponse(res.body.message)
        }
      })
  }
}

export default UsersUsers
