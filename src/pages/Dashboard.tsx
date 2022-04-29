import React from "react";
import { useAuth } from "../hooks/auth";
import AppLayout from "../components/Layouts/AppLayout";
import GuestLayout from "../components/Layouts/GuestLayout";
import { Link } from "react-router-dom";
import ApplicationLogo from "../components/ApplicationLogo";

function Dashboard() {
  const { user, logout } = useAuth({ middleware: "guest" });
  return (
    <>
      {user ? (
        <>
          <AppLayout>
            <div className="py-12">
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                  <div className="m-6 bg-white border-b border-gray-200">
                    You're logged in!
                  </div>
                  <button
                    type="button"
                    className=" m-6 underline text-sm text-gray-600 hover:text-gray-900"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </AppLayout>
        </>
      ) : (
        <>
          {" "}
          <GuestLayout>
            <div className="py-12">
              <Link className="flex justify-center" to="/">
                <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
              </Link>
              <div className="max-w-xl mx-auto sm:px-6 lg:px-8 ">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                  <div className="p-3 flex justify-center">
                    <Link
                      to="/login"
                      className="p-3 underline text-m text-gray-600 hover:text-gray-900"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="p-3 p-3 underline text-m text-gray-600 hover:text-gray-900"
                    >
                      Register
                    </Link>
                  </div>
                  <div className="flex justify-center m-6 bg-white border-b border-gray-200">
                    You're guest!
                  </div>
                </div>
              </div>
            </div>
          </GuestLayout>
        </>
      )}
    </>
  );
}
export default Dashboard;
