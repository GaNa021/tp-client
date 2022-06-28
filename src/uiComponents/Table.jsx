function Table(props) {
  return (
    <>
      <div className="shadow-md sm:rounded-lg ml-1 overflow-y-auto h-4/6">
        <table
          id={props.id}
          className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead className="text-xs uppercase dark:bg-slate-500">
            <tr>
              <th scope="col" className="px-6 py-3"></th>{" "}
              {props.tableHeaders.map((_headers) => {
                return (
                  <th scope="col" className="text-white px-6 py-3">
                    {_headers}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {props.data.map((data) => {
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
                  {props.tableDataObject.map((key) => (
                    <td className="text-black px-6 py-4">
                      {typeof data[key] === "boolean"
                        ? data[key]
                          ? "True"
                          : "False"
                        : `${data[key]}`}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Table
