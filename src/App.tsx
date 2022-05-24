import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import ForgetPassword from "./pages/forgot-password";
import PasswordReset from "./pages/password-reset";
import Mypage from "./pages/mypage/index";
import Books from "./pages/books/index";
import Articles from "./pages/articles/index";
import Show from "./pages/articles/show";
import Create from "./pages/articles/create";
import Edit from "./pages/articles/edit";
import NotFoundPage from "./pages/404";
import { useParams } from "react-router-dom";

function App() {
  // const notifyDefault = () => toast("A toast alert!");
  return (
    <>
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/password-reset/:token" element={<PasswordReset />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/books" element={<Books />} />
        {/* <Route path="/articles" element={<Articles />} /> */}
        <Route path="/article/:id/show" element={<Show />} />
        <Route path="/article/create" element={<Create />} />
        <Route path="/article/:id/edit" element={<Edit />} />
        <Route path="/article/{article}/like" element={<Articles />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
