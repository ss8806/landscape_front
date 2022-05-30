import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "../../../lib/axios";
import { toast } from "react-toastify";

type Props = {
  email: string;
};

const schema = yup.object().shape({
  editEmail: yup.string().required("Please enter title").min(3).max(12),
});

export default function EditEmail({ email }: Props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  yupResolver(schema);

  const onSubmit = (data: any) => {
    console.log(data);
    axios
      .put("http://localhost:/api/editEmail", data)
      .then((response) => {
        console.log(response.data);
        toast.success("登録に成功しました。");
      })
      .catch((error) => {
        console.log(error.data);
        toast.error("登録に失敗しました");
      });
  };

  return (
    <section className="text-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="inputEmail">email</label>
        <input
          id="inputEmail"
          type="email"
          className="mt-1 block mx-auto"
          placeholder="メールアドレス"
          defaultValue={email}
          required
          {...register("editEmail")}
        />
        <input
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-5 "
          type="submit"
          value="メールアドレスを変更"
        />
      </form>
    </section>
  );
}
