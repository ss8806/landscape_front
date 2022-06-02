import ApplicationLogo from "../components/ApplicationLogo";
import AuthCard from "../components/AuthCard";
import AuthSessionStatus from "../components/AuthSessionStatus";
import AuthValidationErrors from "../components/AuthValidationErrors";
import Button from "../components/Button";
import GuestLayout from "../components/Layouts/GuestLayout";
import Input from "../components/Input";
import Label from "../components/Label";
import { useAuth } from "../hooks/auth";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const PasswordReset = () => {
  const params = useParams();
  const { resetPassword } = useAuth({ middleware: "guest" });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);

  const submitForm = (event: any) => {
    event.preventDefault();
    resetPassword({
      email,
      password,
      password_confirmation,
      setErrors,
      setStatus,
    });
  };

  useEffect(() => {
    setEmail(params.email || "");
  }, [params.email]);

  return (
    <GuestLayout>
      <AuthCard
        logo={
          <Link to="/">
            {/* <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" /> */}
          </Link>
        }
      >
        {/* Session Status */}
        <AuthSessionStatus className="mb-4" status={status} />
        {/* Validation Errors */}
        <AuthValidationErrors className="mb-4" errors={errors} />
        <form onSubmit={submitForm}>
          {/* Email Address */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              className="block mt-1 w-full"
              onChange={(event: any) => setEmail(event.target.value)}
              required
              autoFocus
            />
          </div>
          {/* Password */}
          <div className="mt-4">
            <Label htmlFor="password">パスワード</Label>
            <Input
              id="password"
              type="password"
              value={password}
              className="block mt-1 w-full"
              onChange={(event: any) => setPassword(event.target.value)}
              required
            />
          </div>
          {/* Confirm Password */}
          <div className="mt-4">
            <Label htmlFor="password_confirmation">パスワード（確認用）</Label>
            <Input
              id="password_confirmation"
              type="password"
              value={password_confirmation}
              className="block mt-1 w-full"
              onChange={(event: any) =>
                setPasswordConfirmation(event.target.value)
              }
              required
            />
          </div>
          <div className="flex items-center justify-end mt-4">
            <Button>パスワードをリセット</Button>
          </div>
        </form>
      </AuthCard>
    </GuestLayout>
  );
};

export default PasswordReset;
