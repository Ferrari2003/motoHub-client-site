import { Box, Modal } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";
import { getTime } from "../../../Utility/getTime";

const Wishlist = () => {
  const { user, role } = useContext(AuthContext);
  const { data: wishlistData = [], refetch } = useQuery({
    queryKey: ["users?role=buyer"],
    queryFn: () =>
      fetch(
        `https://motohub-alamin-merndev.vercel.app/wishlist?email=${user.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("moto_token")}`,
          },
        }
      ).then((res) => res.json()),
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    p: 4,
  };
  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    if (user?.email) {
      setOpen(true);
    } else {
      navigate("/login");
    }
  };
  const handleClose = () => setOpen(false);

  const onSubmit = (data) => {
    setIsLoading(true);
    const order = {
      customer_name: user?.displayName,
      customer_phone: data.customer_phone,
      customer_email: user.email,
      meeting_location: data.meeting_location,
      product_name: data.product_name,
      product_image: data.product_image,
      product_id: data.product_id,
      product_price: data.product_price,
      order_date: new Date(),
    };
    fetch("https://moto-hub-server-site.vercel.app/order", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("moto_token")}`,
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged) {
          toast.success("Order placed Succesfully ");
          setIsLoading(false);
          reset();
          setTimeout(() => {
            setOpen(false);
          }, 3000);
        }
        if (result.error) {
          toast.error("Already Ordered");
          setIsLoading(false);
        }
      });
  };

  return (
    <div>
      {role.role === "buyer" ? (
        <div>
          {wishlistData?.length === 0 && (
            <p className="text-center pt-5 h-[60vh]">
              {" "}
              You have no wishlist yet
            </p>
          )}
          <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-md overflow-hidden sm:shadow my-5">
            <thead className="text-white">
              {wishlistData?.map((p, i) => (
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
              {wishlistData?.map((order, i) => (
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

                  <td className="border-grey-light border text-center hover:bg-gray-100 p-3 cursor-pointer">
                    <Button onClick={handleOpen} className="mx-auto">
                      Book Now
                    </Button>
                    {/* Buying Modal  */}
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <div>
                          <form onSubmit={handleSubmit(onSubmit)}>
                            {/* register your input into the hook by invoking the "register" function */}
                            <div>
                              <div className="mb-2 block">
                                <Label htmlFor="name" value="Your Name" />
                              </div>
                              <TextInput
                                id="name"
                                type="text"
                                placeholder=""
                                defaultValue={user?.displayName}
                                disabled={true}
                                {...register("name")}
                              />
                            </div>
                            <div>
                              <div className="mb-2 block">
                                <Label value="Your Email" />
                              </div>
                              <TextInput
                                type="text"
                                placeholder=""
                                defaultValue={user.email}
                                disabled={true}
                                {...register("email")}
                              />
                            </div>
                            <div>
                              <div className="mb-2 block">
                                <Label value="Product Name" />
                              </div>
                              <TextInput
                                type="text"
                                value={order.product_name}
                                disabled={true}
                              />
                            </div>
                            <div>
                              <div className="mb-2 block">
                                <Label value="Product Price" />
                              </div>
                              <TextInput
                                type="text"
                                placeholder=""
                                value={`$${order.product_price}`}
                                disabled={true}
                              />
                            </div>
                            <div>
                              <div className="mb-2 block">
                                <Label value="Your Phone Number" />
                              </div>
                              <TextInput
                                type="number"
                                placeholder="017........"
                                {...register("customer_phone")}
                                required={true}
                              />
                            </div>
                            <div>
                              <div className="mb-2 block">
                                <Label value="Meeting Location" />
                              </div>
                              <TextInput
                                type="text"
                                placeholder="Dhaka"
                                {...register("meeting_location")}
                                required={true}
                              />
                            </div>
                            <div>
                              <TextInput
                                type="hidden"
                                value={order.product_image}
                                {...register("product_image")}
                              />
                            </div>
                            <div>
                              <TextInput
                                type="hidden"
                                value={order.product_id}
                                {...register("product_id")}
                              />
                            </div>
                            <div>
                              <TextInput
                                type="hidden"
                                value={order.product_name}
                                {...register("product_name")}
                              />
                            </div>
                            <div>
                              <TextInput
                                type="hidden"
                                value={order.product_price}
                                {...register("product_price")}
                              />
                            </div>

                            {isLoading && (
                              <Spinner
                                aria-label="Center-aligned spinner example"
                                className="my-4"
                              />
                            )}
                            <div className="flex gap-3 pt-3">
                              <Button type="submit">Submit</Button>
                              <Button
                                onClick={() => setOpen(false)}
                                color="failure"
                              >
                                Cancel
                              </Button>
                            </div>
                          </form>
                        </div>
                      </Box>
                    </Modal>
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

export default Wishlist;
