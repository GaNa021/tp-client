import { useState, useEffect } from "react"
import { get, post } from "superagent"
import Alert from "../uiComponents/Alert"

function UsersGroups(props) {
  // State for storing Groups configs as JSON objects
  const [GroupsConfig, setGroupsConfig] = useState(null)
  const [Response, setResponse] = useState("")

  const tableHeaders = ["Group Name", "Base Group", "Description"]

  useEffect(() => {
    getGroups()
  }, [])

  return (
    <>
      {GroupsConfig != null ? (
        <>
          <div className="shadow-md sm:rounded-lg ml-1 overflow-y-auto h-4/6">
            <table
              id="GroupssTable"
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
                {GroupsConfig.map((data) => {
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
                        {data.strBaseGroup}
                      </td>
                      <td className="text-black px-6 py-4">
                        {data.strDescription}
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

  // function for retriving Groups config
  // return : array of JSON objects with Groups config, which is updated in it's state
  function getGroups() {
    // URL to connect to server
    const URL = "http://" + props.host + ":" + props.port

    //get method with headers
    get(URL + "/GetUserGroups")
      .set({
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.sessionid
      })
      .end((err, res) => {
        if (res.status === 200) {
          setGroupsConfig(res.body)
        } else {
          setResponse(res.body.message)
        }
      })
  }
}

export default UsersGroups
