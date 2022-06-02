import ApplicationLogo from "../components/ApplicationLogo";
import AuthCard from "../components/AuthCard";
import AuthValidationErrors from "../components/AuthValidationErrors";
import Button from "../components/Button";
import GuestLayout from "../components/Layouts/GuestLayout";
import Input from "../components/Input";
import Label from "../components/Label";
import { useAuth } from "../hooks/auth";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Register = () => {
  const { register } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/",
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);

  const submitForm = (event: any) => {
    event.preventDefault();
    register({ name, email, password, password_confirmation, setErrors });
  };

  return (
    <GuestLayout>
      <AuthCard
        logo={
          <Link to="/">
            {/* <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" /> */}
          </Link>
        }
      >
        {/* Validation Errors */}
        <AuthValidationErrors className="mb-4" errors={errors} />
        <form onSubmit={submitForm}>
          {/* Name */}
          <div>
            <Label htmlFor="name">名前</Label>
            <Input
              id="name"
              type="text"
              value={name}
              className="block mt-1 w-full"
              onChange={(event: any) => setName(event.target.value)}
              required
              autoFocus
            />
          </div>
          {/* Email Address */}
          <div className="mt-4">
            <Label htmlFor="email">メール</Label>
            <Input
              id="email"
              type="email"
              value={email}
              className="block mt-1 w-full"
              onChange={(event: any) => setEmail(event.target.value)}
              required
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
              autoComplete="new-password"
            />
          </div>
          {/* Confirm Password */}
          <div className="mt-4">
            <Label htmlFor="password_confirmation">パスワード(確認用)</Label>
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
            <NavLink
              to="/login"
              className="underline text-sm text-gray-600 hover:text-gray-900"
            >
              登録済みの方はこちら
            </NavLink>
            <Button className="ml-4">登録</Button>
          </div>
        </form>
      </AuthCard>
    </GuestLayout>
  );
};

export default Register;
