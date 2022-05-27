import React, { SyntheticEvent } from "react";

type Props = {
  name: string;
};

export default function EditName({ name }: Props) {
  const onHandleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {};

  const handleSubmitName = async (e: SyntheticEvent) => {
    e.preventDefault();
  };
  return (
    <section className="text-center">
      <form onSubmit={handleSubmitName}>
        <label htmlFor="inputName">お名前</label>
        <input
          id="inputName"
          type="text"
          name="editName"
          className="mt-1 block mx-auto"
          placeholder="お名前"
          //   value={editName}
          required
          // isFocused={true}
          onChange={onHandleChangeName}
        />
        <button className="ml-4">名前を変更</button>
      </form>
    </section>
  );
}
