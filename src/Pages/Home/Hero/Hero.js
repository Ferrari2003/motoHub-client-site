import React from "react";

const Hero = () => {
  return (
    <div
      className=" text-white text-center py-72"
      style={{
        backgroundImage: `url("https://motoro.wpsixer.com/motoro-spide/wp-content/uploads/2019/12/banner-bg.png")`,
        backgroundSize: "cover",
      }}
    >
      <h1 className="text-7xl  font-bold">Buy, Sell or Trade</h1>
      <p className="py-3 text-2xl font-medium">
        Find Your desire car as MotoHub makes it easy !
      </p>
      <span className="bg-white text-black text-xl px-2 font-medium pb-1">
        Browse from numerious Cars.
      </span>
    </div>
  );
};

export default Hero;
