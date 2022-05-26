import React, { useState } from "react";
import { MenuOutlined, CaretDownOutlined } from "@ant-design/icons";
import { Modal, Avatar, Alert } from "antd";
import Login from "../Login/Login";
import Dropdown from "../Dropdown/Dropdown";
import Register from "../Register/Register";

function Navbar({ showSide }) {
  const userData = localStorage.getItem("user");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [checkModal, setCheckModal] = useState(true);
  const [dropDown, setDropDown] = useState(false);
  const [dropDownAkun, setDropDownAkun] = useState(false);

  const showDropDown = () => {
    if (dropDown) {
      console.log("jadi false");
      setDropDown(false);
    } else {
      console.log("jadi true");
      setDropDown(true);
    }
  };

  const tesLagi = () => {
    if (dropDownAkun) {
      console.log("jadi false");
      setDropDownAkun(false);
    } else {
      console.log("jadi true");
      setDropDownAkun(true);
    }
  };

  const showModalLogin = () => {
    setIsModalVisible(true);
    setCheckModal(true);
  };

  const showModalRegister = () => {
    setIsModalVisible(true);
    setCheckModal(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const reloadAfterLogin = () => {
    console.log("berhasil ke function");
    setIsModalVisible(false);
  };

  console.log(dropDownAkun);

  return (
    <nav className="items-center w-full bg-main-color h-12 sm:h-16 flex drop-shadow-lg fixed top-0 left-0 right-0 z-10">
      <div className="mx-4 md:mx-8 w-full flex justify-between">
        <div className="flex items-center justify-between w-2/5 sm:w-1/4">
          <h1 className="text-xl sm:text-2xl md:text-3xl text-white font-semibold m-0 p-0">
            <span className="font-bold text-second-color">S</span>how
            <span className="font-bold text-second-color">T</span>ime
          </h1>
          <MenuOutlined
            onClick={() => showSide()}
            className="my-auto text-xl sm:text-2xl md:hidden"
            style={{
              color: "#fff",
            }}
          />
        </div>

        {!userData ? (
          <button
            id="loginButton"
            onClick={showDropDown}
            className="border-second-color border-2 text-white h-8 px-2 w-20 rounded-3xl text-sm md:px-6 md:w-28 md:text-base flex items-center justify-between"
          >
            Akun <CaretDownOutlined className="pt-1" />
            {dropDown ? (
              <Dropdown
                login={showModalLogin}
                register={showModalRegister}
                condition={true}
              />
            ) : (
              <></>
            )}
          </button>
        ) : (
          <div onClick={tesLagi} id="loginButton">
            <div className="flex justify-between w-20">
              <Avatar
                className="w-10 h-10"
                src="https://ik.imagekit.io/m1ke1magek1t/default_image/WhatsApp_Image_2020-02-26_at_5.42.11_PM_QsD9fMMl-.jpeg"
              />
              <CaretDownOutlined className="text-white text-2xl" />
            </div>
            {dropDownAkun ? (
              <Dropdown logout={logout} condition={false} />
            ) : (
              <></>
            )}
          </div>
        )}

        <Modal
          title="Login"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ hidden: true }}
          cancelButtonProps={{ hidden: true }}
        >
          {checkModal ? (
            <Login reloadPage={reloadAfterLogin} />
          ) : (
            <Register reloadPage={reloadAfterLogin} />
          )}
        </Modal>
      </div>
    </nav>
  );
}

export default Navbar;
