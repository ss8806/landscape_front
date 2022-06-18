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
    axios.get(apiURL + "/api/user").then((res) => {
      return res.data;
    });
  const { data, error }: any = useSWR(apiURL + "/api/user", fetcher, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // 404では再試行しない。
      if (error.status === 404) return;
      // 再試行は3回までしかできません。
      if (retryCount >= 3) return;
      // 5秒後に再試行します。
      setTimeout(() => revalidate({ retryCount }), 5000);
    },
  });

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
