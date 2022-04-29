import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import ForgetPassword from "./pages/forgot-password";
import PasswordReset from "./pages/password-reset";
import Mypage from "./pages/mypage/index";
import NotFoundPage from "./pages/404";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/forgot-password" element={<ForgetPassword />} />
      <Route path="/password-reset/:token" element={<PasswordReset />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
