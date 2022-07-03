function DropDownComp() {
  return (
    <>
      <div className="grid py-28 md:justify-center">
        <div className="text-xl group relative">
          <button>test</button>
          <div className="group-hover:block hidden absolute bg-white rounded shadow w-44">
            <ul className="top-0 py-2 text-gray-700">
              <li>test</li>
              <li>test</li>
              <li>test</li>
              <li>test</li>
              <li>test</li>
              <li>test</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default DropDownComp
