import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../component/Navbar/Navbar";

function LayoutDetail() {
  return (
    <>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default LayoutDetail;
