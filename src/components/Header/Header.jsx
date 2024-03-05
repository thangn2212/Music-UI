import React from "react";

import Search from "./Search/Search";

const Header = ({ headerContext }) => {
  const [value, setValue] = headerContext;
  return (
    <div className=" flex justify-between w-full  items-center">
      <div className="flex gap-6 w-full items-center">
        <div className="w-1/2 pl-3">
          <Search context={[value, setValue]} />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Header;
