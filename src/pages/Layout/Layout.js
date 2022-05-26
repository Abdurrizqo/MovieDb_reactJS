import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../component/Navbar/Navbar";
import Sidebar from "../../component/Sidebar/Sidebar";

function Layout() {
  const [changeside, setChangeSide] = useState(false);

  function sideControle() {
    if (changeside) {
      setChangeSide(false);
    } else {
      setChangeSide(true);
    }
  }
  return (
    <>
      <Navbar showSide={sideControle} />
      <Sidebar statusDisplay={changeside} />
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
