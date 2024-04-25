import React from "react";

import { FaCalendarCheck } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const Header = () => {

  const date = new Date()
  const day = date.getDate()
  const month = months[date.getMonth()]

  return (
    <div className="flex max-md:flex-row-reverse justify-between font-bold items-center min-h-[80px] bg-darkBlue text-blue p-5 shadow-xl">
      <p className="text-xl max-md:text-[12px]">{month}, {day}th</p>
      <div className="flex gap-1 items-end max-md:items-center">
        <FaCalendarCheck size={"2.5rem"}/>
        <p className="uppercase text-2xl max-md:text-xl">My TODO App</p>
      </div>
      <IoMdSettings size="2rem" className="max-md:hidden"/>
    </div>
  );
};

export default Header;
