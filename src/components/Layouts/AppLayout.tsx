import Navigation from ".//Navigation";
import { useAuth } from "../../hooks/auth";

const AppLayout = ({ children }: any) => {
  const { user } = useAuth({ middleware: "auth" });

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation user={user} />
      {/* Page Content */}
      <main>{children}</main>
    </div>
  );
};

export default AppLayout;
