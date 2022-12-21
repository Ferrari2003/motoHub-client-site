import { Chip } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Button, Spinner } from "flowbite-react";
import React, { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";
import useRole from "../../../Hooks/useRole";
import { getTime } from "../../../Utility/getTime";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const [role] = useRole(user.email);
  const { data = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch(`https://moto-hub-server-site.vercel.app/products/${user.email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("moto_token")}`,
        },
      }).then((res) => res.json()),
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure want to delete?")) {
      fetch(`https://moto-hub-server-site.vercel.app/product/delete/${id}`, {
        method: "POST",
        headers: {
          "content-type": "aplication/json",
          authorization: `bearer ${localStorage.getItem("moto_token")}`,
        },
      })
        .then((res) => {
          toast.success("Deleted");
          refetch();
        })
        .catch((err) => console.error(err));
    }
  };
  const handleAdvertise = (id) => {
    const update = {
      advertise: "true",
      status: "Available",
    };

    if (window.confirm("Are you sure want to Advertise?")) {
      fetch(`https://moto-hub-server-site.vercel.app/product/edit/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("moto_token")}`,
        },
        body: JSON.stringify(update),
      })
        .then((res) => res.json())
        .then((result) => {
          toast.success("Updated");
          refetch();
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div>
      {role.role === "seller" ? (
        <div>
          {data?.length === 0 && (
            <p className="text-center pt-5 h-[60vh]">
              {" "}
              You have no Product yet
            </p>
          )}
          <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-md overflow-hidden sm:shadow my-5">
            <thead className="text-white">
              {data.map((p, i) => (
                <tr
                  key={i}
                  className="bg-blue-600 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none  sm:mb-0"
                >
                  <th className="p-3 text-left border-grey-light border">Sl</th>
                  <th className="p-3 text-left border-grey-light border">
                    Name
                  </th>
                  <th className="p-3 text-left border-grey-light border">
                    Price
                  </th>
                  <th className="p-3 text-left border-grey-light border">
                    Status
                  </th>
                  <th className="p-3 text-left border-grey-light border">
                    Published
                  </th>
                  <th className="p-3 text-left border-grey-light border">
                    Advertise
                  </th>
                  <th
                    className="p-3 text-left border-grey-light border"
                    width="110px"
                  >
                    Actions
                  </th>
                </tr>
              ))}
            </thead>
            <tbody className="flex-1 sm:flex-none">
              {data.map((product, i) => (
                <tr
                  key={i}
                  className="flex flex-col flex-no wrap sm:table-row my-2 sm:mb-0"
                >
                  <td className="border-grey-light border hover:bg-gray-100 p-3">
                    {i + 1}
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3">
                    <img
                      className="inline mr-2 rounded"
                      src={product.product_image}
                      alt=""
                      width={"50px"}
                    />
                    {product.name}
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                    ${product.sell_price}
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                    {product.status === "Sold" ? (
                      <Chip label="Sold" color="error" variant="outlined" />
                    ) : (
                      <Chip
                        label="Avilable"
                        color="success"
                        variant="outlined"
                      />
                    )}
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                    {getTime(product.published_time)}
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 cursor-pointer text-center">
                    {product.status === "Available" &&
                      product.advertise === "true" && (
                        // <p className="font-semibold text-green-500"></p>
                        <Chip label="Advertised" color="success" />
                      )}
                    {product.status === "Available" &&
                      product.advertise !== "true" && (
                        <Button
                          onClick={() => handleAdvertise(product._id)}
                          className="mx-auto"
                        >
                          Advertise
                        </Button>
                      )}
                  </td>
                  <td
                    onClick={() => handleDelete(product._id)}
                    className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer"
                  >
                    Delete
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Toaster></Toaster>
        </div>
      ) : (
        <div className="h-[60vh] flex items-center justify-center">
          <Spinner aria-label="Center-aligned spinner example" />
        </div>
      )}
    </div>
  );
};

export default MyProducts;
