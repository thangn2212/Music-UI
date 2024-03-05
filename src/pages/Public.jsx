import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { SidebarLeft, PlayList, Player, Header } from "../components";

const Public = () => {
  const [value, setValue] = useState({});

  // useEffect(() => {
  //   console.log("value", value);
  // }, [value]);

  return (
    <div className="min-h-screen flex flex-col bg-main-100">
      <div className="w-full  flex flex-auto px-3 py-3 gap-3 ">
        <div className="h-full flex flex-col w-[20%] flex-none gap-3 py-3 px-3 fixed left-0 top-0 bottom-0">
          <SidebarLeft />
          <div className="h-[72.2%] flex-none rounded-lg bg-main-200">
            <PlayList />
          </div>
        </div>
        <div
          className="w-[80%] ml-[20%] rounded-lg px-2 py-2 bg-main-200 text-white overflow-y-auto"
          style={{ height: "calc(100vh - 8rem)" }}
        >
          <div>
            <Header headerContext={[value, setValue]} />
          </div>
          <div>
            <Outlet context={[value, setValue]} />
          </div>
        </div>
      </div>
      <div className="w-full fixed bottom-11 text-white">
        <Player id={value.id} type={value.type} item={value.item} />
      </div>
    </div>
  );
};

export default Public;
