import { Divider } from "@mui/material";
import { GoogleAuthProvider } from "firebase/auth";
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
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import useToken from "../../Hooks/useToken";
import SetTabTitle from "../../Utility/SetTabTitle";
import TittleHeader from "../Shared/TittleHeader/TittleHeader";

const Register = () => {
  const imghostkey = process.env.REACT_APP_imgbb;
  const { createUser, updateUserProfile, providerLogin } =
    useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const googleProvider = new GoogleAuthProvider();
  const [createdEmail, setCreatedEmail] = useState("");
  const [token] = useToken(createdEmail);

  if (token) {
    setTimeout(() => {
      navigate(from, { replace: true });
    }, 1000);
  }

  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm();

  const handleUpdateUserProfile = (name, photoURL) => {
    const profile = {
      displayName: name,
      photoURL: photoURL,
    };

    updateUserProfile(profile)
      .then(() => { })
      .catch((error) => console.error(error));
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    const image = data.profile_image[0];
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
          createUser(data.email, data.password)
            .then((result) => {
              handleUpdateUserProfile(data.name, imageData.data.url);
              saveUser(data.name, data.email, data.role);
              toast.success("Succesfully Signed Up");
            })
            .catch((e) => {
              toast.error(
                e.message === "Firebase: Error (auth/email-already-in-use)."
                  ? "Email already in Use"
                  : e.message
              );
              setIsLoading(false);
            });
        }
      });
  };
  const saveUser = (name, email, role) => {
    const user = {
      name: name,
      email: email,
      role: role,
    };
    fetch("https://moto-hub-server-site.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("moto_token")}`,
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setCreatedEmail(email);
        setIsLoading(false);
        reset();
        setTimeout(() => {
          window.location.reload(false);
        }, 2000);
      });
  };
  const handleGoogleLogin = () => {
    providerLogin(googleProvider)
      .then((res) => {
        const user = res.user;
        setCreatedEmail(user.email);
        saveUser(user?.displayName, user.email, "buyer");
        toast.success("Succesfully Logged in");
        // navigate(from, { replace: true });
      })
      .catch((err) => console.log(err));
  };
  SetTabTitle("Register");
  return (
    <div>
      <TittleHeader title={"Register"}></TittleHeader>
      <div className="container mx-auto py-12">
        <div className="w-1/2 mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Your Name" />
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder="John Doe"
                required={true}
                {...register("name")}
              />
            </div>
            <div>
              <div id="fileUpload" className="py-3">
                <div className="mb-2 block">
                  <Label
                    htmlFor="file"
                    value="Your Profile Image (max-width: 600px)"
                  />
                </div>
                <FileInput
                  required={true}
                  id="file"
                  {...register("profile_image")}
                />
              </div>
            </div>
            <div id="select">
              <div className="mb-2 block">
                <Label htmlFor="role" value="Want to:" />
              </div>
              <Select id="role" required={true} {...register("role")}>
                <option value={"buyer"}>Buy</option>
                <option value={"seller"}>Sell</option>
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Your email" />
              </div>
              <TextInput
                id="email1"
                type="email"
                placeholder="name@flowbite.com"
                required={true}
                {...register("email")}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Your password" />
              </div>
              <TextInput
                id="password1"
                type="password"
                required={true}
                {...register("password")}
              />
            </div>

            {/* {errors.exampleRequired && <span>This field is required</span>} */}
            <div className="flex items-center gap-2 py-4">
              <Label htmlFor="agree">
                Already Have an Account ? Please{" "}
                <Link to="/login" className="text-blue-700">
                  Login
                </Link>
              </Label>
            </div>
            {isLoading && (
              <Spinner
                aria-label="Center-aligned spinner example"
                className="my-4"
              />
            )}
            <Button type="submit">Register</Button>
          </form>
          <div className="py-12">
            <Divider>OR</Divider>
          </div>

          <Button onClick={handleGoogleLogin} className="mx-auto">
            <FaGoogle className="inline text mr-3"></FaGoogle> Google Login
          </Button>
          <Toaster />
        </div>
      </div>
    </div>
  );
};

export default Register;
