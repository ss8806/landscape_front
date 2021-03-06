import Navigation from "../Layouts/Navigation";
import { useAuth } from "../../hooks/auth";

const AppLayout = ({ children }: any) => {
  // const { user } = useAuth({ middleware: "auth" });

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      {/* Page Heading */}
      {/* <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8"></div> */}
      {/* Page Content */}
      <main className="min-h-80 p-16 mb-30 bg-yellow-400">{children}</main>
    </div>
  );
};

export default AppLayout;
