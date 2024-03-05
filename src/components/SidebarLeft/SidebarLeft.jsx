import React from "react";
import logo from "../../asset/logo.jpg";
import { Link, NavLink } from "react-router-dom";
import sidebarMenu from "../../ultis/menu";

const SidebarLeft = () => {
  const notActive =
    "py-2 px-[25px] font-bold flex items-center gap-4 text-[#A0A0A0] text-[13px]";
  const active =
    "py-2 px-[25px] font-bold flex items-center gap-4 text-[#FFF] text-[13px]";
  return (
    <div className="flex flex-col bg-main-200 rounded-lg py-3">
      <Link to="">
        <div className="w-full h-[90px] px-[25px] py-[15px] flex justify-center items-center gap-2">
          <img
            src={logo}
            alt="logo"
            className=" h-full "
            style={{ borderRadius: "30%" }}
          />
        </div>
      </Link>
      {/* {console.log(sidebarMenu)} */}
      <div className="flex flex-col">
        {sidebarMenu.map((item) => (
          <NavLink
            to={item.path}
            key={item.path}
            end={item.end}
            className={({ isActive }) => (isActive ? active : notActive)}
          >
            {item.icons}
            <span>{item.text}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SidebarLeft;
