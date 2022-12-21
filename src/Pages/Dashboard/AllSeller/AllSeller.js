import { useQuery } from "@tanstack/react-query";
import { Spinner } from "flowbite-react";
import React, { useContext, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { GoVerified } from "react-icons/go";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";
import useRole from "../../../Hooks/useRole";
import "./AllSeller.css";

const AllSeller = () => {
  const { user } = useContext(AuthContext);
  const [role] = useRole(user.email);
  const { data = [], refetch } = useQuery({
    queryKey: ["users?role=seller"],
    queryFn: () =>
      fetch(`https://moto-hub-server-site.vercel.app/users?role=seller`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("moto_token")}`,
        },
      }).then((res) => res.json()),
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure want to delete?")) {
      fetch(`https://moto-hub-server-site.vercel.app/users/delete/${id}`, {
        method: "POST",
        headers: {
          "content-type": "aplication/json",
          authorization: `bearer ${localStorage.getItem("moto_token")}`,
        },
        body: JSON.stringify(id),
      })
        .then((res) => {
          toast.success("Deleted");
          refetch();
        })
        .catch((err) => console.error(err));
    }
  };
  const handleUnVerify = (id) => {
    if (window.confirm("Are you sure want to Unverify?")) {
      fetch(`https://moto-hub-server-site.vercel.app/users/edit/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "aplication/json",
          verify: "false",
          authorization: `bearer ${localStorage.getItem("moto_token")}`,
        },
      })
        .then((res) => {
          toast.error("Unverified");
          refetch();
        })
        .catch((err) => toast.error(err.message));
    }
  };
  const handleVerify = (id) => {
    fetch(`https://moto-hub-server-site.vercel.app/users/edit/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "aplication/json",
        verify: "true",
        authorization: `bearer ${localStorage.getItem("moto_token")}`,
      },
    })
      .then((res) => {
        toast.success("Verified");
        refetch();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      {role.role === "admin" ? (
        <div className="">
          {data?.length === 0 && (
            <p className="text-center pt-5 h-[60vh]"> No Sellers yet</p>
          )}
          <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-md overflow-hidden sm:shadow my-5">
            <thead className="text-white">
              {data?.map((u, i) => (
                <tr
                  key={i}
                  className="bg-blue-600 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none  sm:mb-0"
                >
                  <th className="p-3 text-left border-grey-light border">Sl</th>
                  <th className="p-3 text-left border-grey-light border">
                    Name
                  </th>
                  <th className="p-3 text-left border-grey-light border">
                    Email
                  </th>
                  <th className="p-3 text-left border-grey-light border">
                    Role
                  </th>
                  <th className="p-3 text-left border-grey-light border">
                    Verify
                  </th>
                  <th className="p-3 text-left border-grey-light border">
                    Actions
                  </th>
                </tr>
              ))}
            </thead>
            <tbody className="flex-1 sm:flex-none">
              {data?.map((user, i) => (
                <tr
                  key={i}
                  className="flex flex-col flex-no wrap sm:table-row my-2 sm:mb-0"
                >
                  <td className="border-grey-light border hover:bg-gray-100 p-3">
                    {i + 1}
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3">
                    {user.name}
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                    {user.email}
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                    {user.role}
                  </td>

                  <td className="border-grey-light border hover:bg-gray-100 p-3 text-green-400 hover:text-green-600 hover:font-medium cursor-pointer">
                    {user.verify !== "true" && (
                      <span onClick={() => handleVerify(user._id)}>Verify</span>
                    )}
                    {user.verify === "true" && (
                      <GoVerified
                        onClick={() => handleUnVerify(user._id)}
                      ></GoVerified>
                    )}
                  </td>
                  <td
                    className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer"
                    onClick={() => handleDelete(user._id)}
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

export default AllSeller;
