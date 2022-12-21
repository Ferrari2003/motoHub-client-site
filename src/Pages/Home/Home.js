import React from "react";
import Hero from "./Hero/Hero";

import Advertise from "./Advertise/Advertise";
import Category from "./Category/Category";
import Banner from "./Banner/Banner";

import Service from "./Service/Service";
import SetTabTitle from "../../Utility/SetTabTitle";

const Home = () => {
  SetTabTitle("Home");
  return (
    <div className="bg-white">
      <Hero></Hero>
      <Advertise></Advertise>
      <Category></Category>
      <Banner></Banner>
      <Service></Service>
    </div>
  );
};

export default Home;
