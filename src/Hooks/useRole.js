import { useEffect, useState } from "react";

const useRole = (email) => {
  const [role, setRole] = useState("");
  const [roleLoading, setRoleLoading] = useState("");

  useEffect(() => {
    if (email) {
      fetch(`https://moto-hub-server-site.vercel.app/users/role/${email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("moto_token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setRole(data);
          }
        });
    }
  }, [email]);

  return [role, roleLoading];
};

export default useRole;
