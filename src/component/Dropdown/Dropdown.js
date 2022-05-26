import React from "react";

function Dropdown({ login, logout, register, condition }) {
  if (condition) {
    return (
      <div className="absolute w-36 rounded-sm text-main-color shadow-sm bg-white z-10 right-10 top-12">
        <div
          onClick={() => login()}
          className="py-2 text-base hover:bg-second-color"
        >
          Login
        </div>
        <div
          onClick={() => register()}
          className="py-2 text-base hover:bg-second-color"
        >
          Register
        </div>
      </div>
    );
  } else {
    return (
      <div className="absolute w-36 rounded-sm text-main-color shadow-sm bg-white z-10 right-10 top-14">
        <div className="p-2 text-base hover:bg-second-color">Profile</div>

        <div
          onClick={() => logout()}
          className="p-2 text-base hover:bg-second-color"
        >
          Logout
        </div>
      </div>
    );
  }
}

export default Dropdown;
