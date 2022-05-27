import React, { SyntheticEvent, useEffect } from "react";
import { useAuth } from "../../hooks/auth";
import AppLayout from "../../components/Layouts/AppLayout";

import EditName from "./profile_components/EditName";
import EditEmail from "./profile_components/EditEmail";
import EditIcon from "./profile_components/EditIcon";
import EditPassword from "./profile_components/EditPassword";

const Profile = (user: any) => {
  const { name, email, icon, password } = user;

  return (
    <AppLayout>
      <section className="p-10 text-center">
        <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
          <EditIcon icon={icon}></EditIcon>
          <EditName name={name}></EditName>
          <EditEmail email={email}></EditEmail>
          <EditPassword password={password}></EditPassword>
        </div>
      </section>
    </AppLayout>
  );
};

export default Profile;
