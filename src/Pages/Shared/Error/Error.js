import { Button } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import errorImg from "../../../Assets/error2.svg";

const Error = ({ title }) => {
  return (
    <div
      className="h-[60vh] flex items-center justify-center"
      style={{
        backgroundImage: `url(${errorImg})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    >
      <div className="text-center mx-auto">
        {" "}
        <h2 className="text-red-500 font-bold  text-4xl  bg-white px-3 pb-1 inline">
          {title}
        </h2>
        <p className="py-3 text-xl font-semibold">
          Opps! The page you are looking for not found
        </p>
        <Link to="/">
          <Button className="mx-auto">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
