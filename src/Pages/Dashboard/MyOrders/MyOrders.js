import { useQuery } from "@tanstack/react-query";
import { Button, Spinner } from "flowbite-react";
import React, { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";
import useRole from "../../../Hooks/useRole";
import { getTime } from "../../../Utility/getTime";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [role, loading] = useRole(user.email);
  const { data = [], refetch } = useQuery({
    queryKey: ["order"],
    queryFn: () =>
      fetch(`https://moto-hub-server-site.vercel.app/order?email=${user.email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("moto_token")}`,
        },
      }).then((res) => res.json()),
  });

  const handlePay = (id, orderId) => {
    const update = {
      advertise: "false",
      status: "Sold",
    };

    if (window.confirm("Are you sure want to Advertise?")) {
      fetch(`https://moto-hub-server-site.vercel.app/order/edit/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          id: orderId,
          authorization: `bearer ${localStorage.getItem("moto_token")}`,
        },
        body: JSON.stringify(update),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.acknowledged) {
            toast.success("Updated");
            refetch();
          }
        })
        .catch((err) => console.error(err));
    }
  };
  if (loading) {
    return <Spinner className="h-[70vh]"></Spinner>;
  }
  return (
    <div>
      {role.role === "buyer" ? (
        <div>
          {data.length === 0 && (
            <p className="text-center pt-5 h-[60vh]"> You have no order yet</p>
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
                    Product Name
                  </th>
                  <th className="p-3 text-left border-grey-light border">
                    Price
                  </th>

                  <th className="p-3 text-left border-grey-light border">
                    Order Date
                  </th>

                  <th
                    className="p-3 text-left border-grey-light border"
                  // width="110px"
                  >
                    Actions
                  </th>
                </tr>
              ))}
            </thead>
            <tbody className="flex-1 sm:flex-none">
              {data.map((order, i) => (
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
                      src={order.product_image}
                      alt=""
                      width={"50px"}
                    />
                    {order.product_name}
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                    ${order.product_price}
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                    {getTime(order.order_date)}
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 cursor-pointer">
                    {order.paid === true ? (
                      <p className="font-semibold text-green-500">Paid</p>
                    ) : (
                      // <Button
                      //   onClick={() =>
                      //     handlePay(order.product_id, order._id)
                      //   }
                      //   className="mx-auto"
                      // >
                      //   Pay
                      // </Button>
                      <Link to={`/dashboard/payment/${order._id}`}>
                        <Button>Pay</Button>
                      </Link>
                    )}
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

export default MyOrders;
