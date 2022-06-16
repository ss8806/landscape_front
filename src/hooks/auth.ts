import useSWR from "swr";
import axios from "../lib/axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const useAuth = ({ middleware, redirectIfAuthenticated }: any = {}) => {
  let navigate = useNavigate();
  let params = useParams();

  const {
    data: user,
    error,
    mutate,
  } = useSWR(
    "/api/user",
    () =>
      axios
        .get("/api/user")
        .then((res) => res.data)
        .catch((error) => {
          if (error.response.status !== 409) throw error;

          mutate("/verify-email");
        }),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }
  );

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const register = async ({ setErrors, ...props }: any) => {
    await csrf();
    setErrors([]);
    axios
      .post("/register", props)
      // 上で宣言してるのでmutate("api/user")にしてなくても動く
      .then(() => {
        mutate();
        toast.success("登録しました。");
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;
        setErrors(Object.values(error.response.data.errors).flat());
        toast.error("登録できませんでした。");
      });
  };

  const login = async ({ setErrors, setStatus, ...props }: any) => {
    await csrf();
    setErrors([]);
    setStatus(null);
    axios
      .post("/login", props)
      .then(() => {
        mutate();
        toast.success("ログインしました。");
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;
        setErrors(Object.values(error.response.data.errors).flat());
      });
  };

  const forgotPassword = async ({ setErrors, setStatus, email }: any) => {
    await csrf();
    setErrors([]);
    setStatus(null);
    axios
      .post("/forgot-password", { email })
      .then((response) => setStatus(response.data.status))
      .catch((error) => {
        if (error.response.status !== 422) throw error;
        setErrors(Object.values(error.response.data.errors).flat());
      });
  };

  const resetPassword = async ({ setErrors, setStatus, ...props }: any) => {
    await csrf();
    setErrors([]);
    setStatus(null);
    axios
      .post("/reset-password", { token: params.token, ...props })
      .then((response) => {
        console.log(response.data);
        navigate(`/login?reset=${window.btoa(response.data.status)}`);
        toast.success("パスワードを変更しました。");
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;
        setErrors(Object.values(error.response.data.errors).flat());
      });
  };

  const resendEmailVerification = ({ setStatus }: any) => {
    axios.post("/email/verification-notification").then((response) => {
      setStatus(response.data.status);
    });
  };

  const logout = async () => {
    if (!error) {
      await axios.post("/logout");
      mutate("/api/user");
      toast.success("ログアウトします。");
    }
    window.location.pathname = "/";
  };

  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user)
      navigate(redirectIfAuthenticated);
    if (middleware === "auth" && error) logout();
  }, [user, error]);

  return {
    user,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
  };
};
