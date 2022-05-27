import React, { SyntheticEvent } from "react";

type Props = {
  email: string;
};

export default function EditEmail({ email }: Props) {
  const onHandleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setData("editEmail", event.target.value);
  };

  const handleSubmitEmail = async (e: SyntheticEvent) => {
    e.preventDefault();
    // put("/editEmail");
  };

  return (
    <section className="text-center">
      <form onSubmit={handleSubmitEmail}>
        <label htmlFor="inputEmail">email</label>
        <input
          id="inputEmail"
          type="email"
          name="editEmail"
          className="mt-1 block mx-auto"
          placeholder="メールアドレス"
          //   value=
          required
          onChange={onHandleChangeEmail}
        />
        <button className="ml-4">メールアドレスを変更</button>
      </form>
    </section>
  );
}
