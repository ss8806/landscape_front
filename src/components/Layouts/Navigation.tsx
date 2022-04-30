import ApplicationLogo from "../ApplicationLogo";
import { useAuth } from "../../hooks/auth";
import { useState } from "react";
import CustomNavLink from "../NavLink";
import { Link } from "react-router-dom";
import MenuListComposition from "../../components/MenuListComposition";

const Navigation = ({ user }: any) => {
  // const { logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-100">
      {/* Primary Navigation Menu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Navigation Links */}
            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
              <CustomNavLink to="/articles">Landscape</CustomNavLink>
            </div>
          </div>
          {/* Settings Dropdown */}
          <MenuListComposition />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;