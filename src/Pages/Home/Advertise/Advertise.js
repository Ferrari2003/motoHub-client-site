import { Spinner } from "flowbite-react";
import React, { useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";
import useAxios from "../../../Hooks/useAxios";
import AdvertiseCard from "../../Shared/AdvertiseCard/AdvertiseCard";
import HeadingDivider from "../../Shared/HeadingDivider/HeadingDivider";

const Advertise = () => {
  const { logOut } = useContext(AuthContext);
  const {
    response = [],
    loading,
    error,
  } = useAxios({
    method: "get",
    url: `https://moto-hub-server-site.vercel.app/products`,
    headers: JSON.stringify({
      headers: {
        authorization: ` Bearer ${localStorage.getItem("moto_token")}`,
      },
    }),
    body: JSON.stringify({}),
  });
  if (loading) {
    return (
      <div className="flex justify-center items-center h-72">
        <Spinner aria-label="Center-aligned spinner example" />
      </div>
    );
  }
  if (error) {
    logOut().then().catch();
  }
  return (
    <>
      {response?.length > 0 && (
        <div className="py-24 container mx-auto px-8 lg:px-0 bg-white">
          <div>
            <h2 className="text-center  text-3xl font-bold">Popular Cars</h2>
            <p className="font-bold text-center pt-3 ">Get Your Ones</p>
            <HeadingDivider></HeadingDivider>
          </div>
          <div className=" pt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
            {response.map((product) => (
              <AdvertiseCard
                key={product._id}
                product={product}
              ></AdvertiseCard>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Advertise;
