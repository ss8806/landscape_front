import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "../../../lib/axios";
import { toast } from "react-toastify";
import { apiURL } from "../../../config.dev";

const schema = yup.object().shape({
  password: yup.string().required("Please enter title").min(4).max(12),
  // password_confirmation: yup
  //   .string()
  //   .required("Please enter title")
  //   .min(4)
  //   .max(12),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
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
      .put(apiURL + "/api/editPassword", data)
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
        <p className="text-red-500">
          {errors.password && "4文字以上入力して下さい。"}
        </p>

        <input
          type="password"
          // name="password_confirmation"
          className="mt-1 block mx-auto"
          // value={password_cwonfirmation}
          placeholder="パスワード(確認)"
          required
          {...register("password_confirmation")}
        />
        <p className="text-red-500">
          {errors.password_confirmation && "上記と一致しません"}
        </p>

        <input
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-5 "
          type="submit"
          value="パスワードを変更"
        />
      </form>
    </section>
  );
}
