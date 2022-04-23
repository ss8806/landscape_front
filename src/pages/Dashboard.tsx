import React from "react";
import { useAuth } from "../hooks/auth";
import { Link } from "react-router-dom";

function Dashboard() {
  const { user, logout } = useAuth({ middleware: "guest" });
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          {user ? (
            <div className="p-6 bg-white border-b border-gray-200">
              You're logged in!
              <button
                type="button"
                className="underline text-sm text-gray-600 hover:text-gray-900"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="p-3">
                Login
              </Link>
              <Link to="/register" className="p-3">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
