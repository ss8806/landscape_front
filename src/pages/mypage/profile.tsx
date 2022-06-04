import React, { SyntheticEvent, useEffect } from "react";
import { useAuth } from "../../hooks/auth";
import AppLayout from "../../components/Layouts/AppLayout";
import axios from "../../lib/axios";
import useSWR from "swr";
import EditName from "./profile_components/EditName";
import EditEmail from "./profile_components/EditEmail";
import EditIcon from "./profile_components/EditIcon";
import EditPassword from "./profile_components/EditPassword";
import { apiURL } from "../../config.dev";

const Profile = () => {
  useAuth({ middleware: "auth" });
  // console.log(user);

  const fetcher = () =>
    axios
      .get(apiURL + "/api/user")
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  const { data, error }: any = useSWR("http://localhost:/api/user", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading......</div>;
  console.log(data);

  return (
    <AppLayout>
      <section className="p-10 text-center">
        <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
          <EditIcon icon={data.icon}></EditIcon>
          <EditName name={data.name}></EditName>
          <EditEmail email={data.email}></EditEmail>
          <EditPassword></EditPassword>
        </div>
      </section>
    </AppLayout>
  );
};

export default Profile;
