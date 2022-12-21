import React from "react";
import "./TittleHeader.css";

const TittleHeader = ({ title }) => {
  return (
    <div
      className="py-40 breadcrumb__overlay"
      style={{
        backgroundImage: `url("https://i.ibb.co/HCmPMJN/pexels-torsten-dettlaff-70912.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <h2 className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-2xl lg:text-5xl font-bold text-white z-10">
        {title}
      </h2>
    </div>
  );
};

export default TittleHeader;
