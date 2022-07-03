// Not fixed , no idea what todo for now

function DropDown() {
  const li_styles =
    "py-2 hover:text-green-500 transition duration-300 hover:cursor-pointer"
  const navTO = [
    "/NEInterfaces/NeGateways",
    "/NEInterfaces/NeSessions",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ]

  return (
    <>
      <div className="absolute bg-white rounded shadow w-44">
        <ul className="py-2 text-gray-700">
          <li
            className={li_styles}
            onClick={() => {
              //props.navigate("/UsersGroups")
              //props.toggleshowMenuUsers()
            }}
          >
            Groups
          </li>
          <li
            className={li_styles}
            onClick={() => {
              //props.navigate("/UsersUsers")
              //props.toggleshowMenuUsers()
            }}
          >
            Users
          </li>
          <li
            className={li_styles}
            onClick={() => {
              //props.navigate("/ErrorPage")
              //props.toggleshowMenuUsers()
            }}
          >
            LoggedIn Users
          </li>
          <li
            className={li_styles}
            onClick={() => {
              //props.navigate("/ErrorPage")
              //props.toggleshowMenuUsers()
            }}
          >
            Users History
          </li>
          <li
            className={li_styles}
            onClick={() => {
              //props.navigate("/ErrorPage")
              //props.toggleshowMenuUsers()
            }}
          >
            Auth Settings
          </li>
        </ul>
      </div>
    </>
  )
}

export default DropDown

/*
<div
                    onClick={() => setdropdownOpen(!dropdownOpen)}
                    className="overflow-hidden rounded-full w-8 h-8 flex justify-center items-center
                            hover:cursor-pointer
                            "
                  >
                    Toggle
                  </div>

                  <div
                    className={`${
                      dropdownOpen
                        ? `top-full opacity-100 visible`
                        : "top-[110%] invisible opacity-0"
                    } absolute left-0 z-40 mt-2 w-full rounded border-[.5px] border-light bg-white py-5 shadow-card transition-all`}
                  >
                    <a
                      href="javascript:void(0)"
                      className="block py-2 px-5 text-base font-semibold text-body-color hover:bg-primary hover:bg-opacity-5 hover:text-primary"
                    >
                      Dashboard
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="block py-2 px-5 text-base font-semibold text-body-color hover:bg-primary hover:bg-opacity-5 hover:text-primary"
                    >
                      Settings
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="block py-2 px-5 text-base font-semibold text-body-color hover:bg-primary hover:bg-opacity-5 hover:text-primary"
                    >
                      Earnings
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="block py-2 px-5 text-base font-semibold text-body-color hover:bg-primary hover:bg-opacity-5 hover:text-primary"
                    >
                      Logout
                    </a>
                  </div>
*/
