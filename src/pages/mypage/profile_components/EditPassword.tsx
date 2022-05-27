import React, { SyntheticEvent, useEffect } from "react";

type Props = {
  password: string;
};

export default function EditPassword({ password }: Props) {
  // useEffect(() => {
  //     return () => {
  //         reset("password", "password_confirmation");
  //     };
  // }, []);

  const onHandleChangePassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {};

  const handleSubmitPassword = async (e: SyntheticEvent) => {
    e.preventDefault();
    // put("/editPassword");
  };
  return (
    <section className="text-center">
      <form onSubmit={handleSubmitPassword}>
        <label htmlFor="editPassword">パスワード</label>
        <input
          id="editPassword"
          type="password"
          name="password"
          className="mt-1 block mx-auto"
          placeholder="パスワード"
          value={password}
          required
          onChange={onHandleChangePassword}
        />
        <input
          type="password"
          name="password_confirmation"
          // value={data.password_confirmation}
          className="mt-1 block mx-auto"
          placeholder="パスワード確認"
          onChange={onHandleChangePassword}
          required
        />
        <button className="ml-4">パスワードを変更</button>
      </form>
    </section>
  );
}
