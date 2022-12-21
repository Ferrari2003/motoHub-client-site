import { Divider } from "@mui/material";
import { GoogleAuthProvider } from "firebase/auth";
import { Button, Label, TextInput } from "flowbite-react";
import React, { useContext, useState } from "react";

import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import useToken from "../../Hooks/useToken";
import SetTabTitle from "../../Utility/SetTabTitle";
import TittleHeader from "../Shared/TittleHeader/TittleHeader";

const Login = () => {
  const { signIn, setLoading, providerLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const googleProvider = new GoogleAuthProvider();
  const from = location.state?.from?.pathname || "/";
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

    reset,
  } = useForm();

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
        // location.reload();
      });
  };

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((res) => {
        setCreatedEmail(res.user.email);
        saveUser(res.user?.displayName, res.user.email, "buyer");
        setLoading(false);
        reset();
        toast.success("Successfully logged in!");
        // navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        toast.error(
          error.message === "Firebase: Error (auth/wrong-password)."
            ? "Wrong Password"
            : "User not found"
        );
      });
  };
  SetTabTitle("Login");
  return (
    <div>
      <TittleHeader title={"Login"}></TittleHeader>
      <div className="container mx-auto py-12">
        <div className="w-1/2 mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
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
                New to this site ? Please{" "}
                <Link to="/register" className="text-blue-700">
                  Register
                </Link>
              </Label>
            </div>

            <Button type="submit">Login</Button>
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

export default Login;
