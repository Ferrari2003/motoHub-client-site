import React from "react";
import { Outlet } from "react-router-dom";
import FooterMain from "../../Pages/Shared/FooterMain/FooterMain";
import Header from "../../Pages/Shared/Header/Header";

const Main = () => {
  return (
    <div className="bg-white">
      <Header></Header>
      <Outlet></Outlet>
      <FooterMain></FooterMain>
    </div>
  );
};

export default Main;
