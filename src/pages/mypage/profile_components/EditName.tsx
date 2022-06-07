import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "../../../lib/axios";
import { toast } from "react-toastify";
import { apiURL } from "../../../config.dev";

type Props = {
  name: string;
};

const schema = yup.object().shape({
  editName: yup.string().required("Please enter title").min(3).max(12),
});

export default function EditName({ name }: Props) {
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
      .put(apiURL + "/api/editName", data)
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
        <label htmlFor="inputName">お名前</label>
        <input
          id="inputName"
          type="text"
          className="mt-1 block mx-auto"
          placeholder="お名前"
          defaultValue={name}
          required
          {...register("editName")}
        />
        <div>{errors.editName && "3文字以上入力して下さい。"}</div>
        <input
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-5 "
          type="submit"
          value="名前を変更"
        />
      </form>
    </section>
  );
}
