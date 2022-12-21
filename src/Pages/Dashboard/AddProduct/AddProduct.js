import {
  Button,
  FileInput,
  Label,
  Select,
  Spinner,
  TextInput,
} from "flowbite-react";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";
import useRole from "../../../Hooks/useRole";

const AddProduct = () => {
  const imghostkey = process.env.REACT_APP_imgbb;
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [role] = useRole(user.email);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    setIsLoading(true);
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imghostkey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        if (imageData.success) {
          const product = {
            name: data.name,
            product_image: imageData.data.url,
            model_year: data.model_year,
            reg_year: data.reg_year,
            buy_price: data.buy_price,
            sell_price: data.sell_price,
            seller: user?.displayName,
            seller_email: user.email,
            seller_image: user.photoURL,
            category: data.category,
            published_time: new Date(),
            condition: data.condition,
            seller_contact: data.phone,
            seller_location: data.location,
            status: "Available",
          };
          fetch("https://moto-hub-server-site.vercel.app/add-product", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem("moto_token")}`,
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((result) => {
              toast.success("Added");
              reset();
              setIsLoading(false);
            });
        } else {
          toast.error("Provide a Valid image file");
          setIsLoading(false);
        }
      });
  };

  return (
    <div>
      {role.role === "seller" ? (
        <div className="px-8 mx-auto">
          <h2 className="py-3 text-2xl font-semibold">Add a Product </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Product Name" />
                </div>
                <TextInput
                  required={true}
                  id="small"
                  type="text"
                  sizing="md"
                  {...register("name")}
                />
              </div>
              <div id="fileUpload" className="py-3">
                <div className="mb-2 block">
                  <Label htmlFor="file" value="Add Product Image" />
                </div>
                <FileInput required={true} id="file" {...register("image")} />
              </div>
              <div id="brand">
                <div className="mb-2 block">
                  <Label htmlFor="brand" value="Select your brand" />
                </div>
                <Select id="brand" required={true} {...register("category")}>
                  <option value={1} defaultChecked>
                    Toyota
                  </option>
                  <option value={2}>Honda</option>
                  <option value={3}>Hyundai</option>
                  <option value={4}>Nissan</option>
                </Select>
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="condition" value="Select Product Condtion" />
                </div>
                <Select
                  id="condition"
                  required={true}
                  {...register("condition")}
                >
                  <option defaultChecked>Excellent</option>
                  <option>Good</option>
                  <option>Fair</option>
                </Select>
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Model Year" />
                </div>
                <TextInput
                  required={true}
                  id="small"
                  type="number"
                  sizing="md"
                  {...register("model_year")}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Registration Year" />
                </div>
                <TextInput
                  required={true}
                  id="small"
                  type="number"
                  sizing="md"
                  {...register("reg_year")}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Buying Price ($)" />
                </div>
                <TextInput
                  required={true}
                  id="small"
                  type="number"
                  sizing="md"
                  {...register("buy_price")}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Selling Price ($)" />
                </div>
                <TextInput
                  required={true}
                  id="small"
                  type="number"
                  sizing="md"
                  {...register("sell_price")}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="mobile" value="Contact Number" />
                </div>
                <TextInput
                  required={true}
                  id="mobile"
                  type="number"
                  sizing="md"
                  {...register("phone")}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="location" value="Location" />
                </div>
                <TextInput
                  required={true}
                  id="location"
                  type="text"
                  sizing="md"
                  {...register("location")}
                />
              </div>
            </div>

            {isLoading && (
              <Spinner
                aria-label="Center-aligned spinner example"
                className="my-4"
              />
            )}
            <Button className="my-4" type="submit">
              Add
            </Button>
          </form>
          <Toaster />
        </div>
      ) : (
        <div className="h-[60vh] flex items-center justify-center">
          <Spinner aria-label="Center-aligned spinner example" />
        </div>
      )}
    </div>
  );
};

export default AddProduct;
