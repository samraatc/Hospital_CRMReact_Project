import React from "react";
import logo from "../assets/companylogoremovebg.png";
import '../css/Navbar.css'



const Navbar = () => {
  return (
    <div className="flex  py-5 px-10 rounded-full bg-black mx-3">
      <div className="h-30 w-40 flex items-center justify-center ">
        <img src={logo} alt="" />
      </div>
      <div className="flex w-3/4 items-center justify-center ">
        <h1 className="logotxt text-8xl font-bold text-white">Carekloud</h1>
      </div>
    </div>
  );
};

export default Navbar;
