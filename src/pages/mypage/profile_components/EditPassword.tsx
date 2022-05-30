import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "../../../lib/axios";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  password: yup.string().required("Please enter title").min(3).max(12),
  // password_confirmation: yup
  //   .string()
  //   .required("Please enter title")
  //   .min(3)
  //   .max(12),
});

export default function EditPassword() {
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
      .put("http://localhost:/api/editPassword", data)
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
        <label htmlFor="editPassword">パスワード</label>
        <input
          id="editPassword"
          type="password"
          className="mt-1 block mx-auto"
          placeholder="パスワード"
          required
          {...register("password")}
        />
        <div>{errors.password && "3文字以上入力して下さい。"}</div>

        {/* <input
          type="password"
          // name="password_confirmation"
          className="mt-1 block mx-auto"
          // value={password_confirmation}
          placeholder="パスワード確認"
          required
          // {...register("password_confirmation")}
        /> */}

        <input
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-5 "
          type="submit"
          value="パスワードを変更"
        />
      </form>
    </section>
  );
}
